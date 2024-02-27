const { QueryTypes } = require('sequelize')
const connection = require('../utilities/connection')
const constants = require('../utilities/constants')
const Customer = require('../models/Customer.model')

const countUpdater = async (connection, transaction) => {
  try {
    let count = 0
    const query = `SELECT customer_id, COUNT(customer_id) AS "count" FROM public.order GROUP BY customer_id ORDER BY customer_id DESC;`
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    const customer = await Customer(connection)
    for (let i = 0; i < response.length; i++) {
      count++
      await customer.update({
        count: response[i].count
      }, {
        where: {
          id: response[i].customer_id
        },
        transaction
      })
    }

    return {
      status: true,
      message: `${count} rows affected`
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
    const response = await countUpdater(connection, transaction)
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