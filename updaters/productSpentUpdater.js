const { QueryTypes } = require('sequelize')
const connection = require('../utilities/connection')
const constants = require('../utilities/constants')
const Customer = require('../models/Customer.model')

const productPriceUpdater = async (connection, transaction) => {
  try {
    const query = `SELECT o.customer_id, o.id, SUM(ol.price * ol.quantity) - SUM(o.discount) / COUNT(o.id) AS "spent" FROM public.order o INNER JOIN public.order_lineitem ol ON o.id = ol.order_id WHERE ol.deal_id IS NULL AND o.id NOT IN (16,30,35,37,39,40,42,43,45,46,49,52,54,58,60,61,62,65,70,76,83,100,107,138,145,146,160,185,205,219,220,222,226,229,233,236,239,244,246,267,287,296,308,323,342,349,360,367,369,383,391,394,397,398,400,401,404,411,413,415,424,441,454,474,479,481,484,524,533,534,545,551,569,577,590,592,603,605,607,610,614,615,616,624,635,648,662,663,664,665,671,673,678) GROUP BY o.customer_id, o.id ORDER BY o.customer_id DESC;`
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    for (let i = 0; i < response.length; i++) {
      const customer = await Customer(connection)
      const customerResponse = await customer.findOne({
        where: {
          id: response[i].customer_id
        },
        order: [
          ['id', 'DESC']
        ],
        transaction
      })

      customerResponse.spent = customerResponse.spent + response[i].spent
      await customerResponse.save({ transaction })
    }

    return {
      status: true,
      message: `${response.length} rows affected`
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
    const response = await productPriceUpdater(connection, transaction)
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