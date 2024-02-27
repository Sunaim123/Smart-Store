const { Op, QueryTypes } = require('sequelize')
const connection = require('../utilities/connection')
const constants = require('../utilities/constants')
const Customer = require('../models/Customer.model')

const dealPriceUpdater = async (connection, transaction) => {
  try {
    const query = `SELECT o.customer_id, (SUM(ol.price * ol.quantity) - SUM(o.discount) / COUNT(ol.id)) AS "spent" FROM public.order o INNER JOIN public.customer c ON o.customer_id = c.id INNER JOIN public.order_lineitem ol ON o.id = ol.order_id WHERE ol.deal_id IS NULL GROUP BY o.customer_id ORDER BY o.customer_id DESC;`
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    const ids = response.map(x => x.customer_id)
    const customer = await Customer(connection)
    const customers = await customer.findAll({
      where: {
        id: {
          [Op.in]: ids
        }
      },
      order: [
        ['id', 'DESC']
      ]
    })

    for (let i = 0; i < response.length; i++) {
      await customer.update({
        spent: response[i].spent + customers[i].spent
      }, {
        where: {
          id: response[i].customer_id
        },
        transaction
      })
    }

    return {
      status: true,
      message: `${customers.length} rows affected`
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const setup = async (connection) => {
  const transaction = await connection.transaction()

  try {
    const response = await dealPriceUpdater(connection, transaction)
    if (!response.status) throw new Error(response.message)

    await transaction.commit()

    return response.message
  } catch (error) {
    await transaction.rollback()

    throw error
  }
}

setup(connection)
  .then(response => {
    console.log(response)
    process.exit(0)
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })