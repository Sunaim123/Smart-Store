const { QueryTypes } = require('sequelize')
const connection = require('../utilities/connection')
const constants = require('../utilities/constants')
const Customer = require('../models/Customer.model')

const countAndSpentUpdater = async (connection, transaction) => {
  try {
    let count = 0
    const query = `SELECT o.customer_id, COUNT(o.id) AS "count", SUM(o.total) - SUM(o.discount) AS "spent", MAX(c.last_order) AS "last_campaign" FROM public.order o INNER JOIN public.customer c ON o.customer_id = c.id GROUP BY o.customer_id ORDER BY o.customer_id;`
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    const customer = await Customer(connection)
    for (let i = 0; i < response.length; i++) {
      count++
      await customer.update({
        count: response[i].count,
        spent: response[i].spent,
        last_campaign: response[i].last_campaign
      }, {
        where: {
          id: response[i].customer_id
        }
      })
    }

    return {
      status: true,
      customers: `${count} rows affected`
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
    const response = await countAndSpentUpdater(connection, transaction)
    if (!response.status) throw new Error(response.message)

    await transaction.commit()

    return 'Setup successful'
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