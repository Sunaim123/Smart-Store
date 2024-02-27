const { col, fn, Op } = require('sequelize')
const connection = require('../utilities/connection')
const constants = require('../utilities/constants')
const Customer = require('../models/Customer.model')
const Order = require('../models/Order.model')

const zoneUpdater = async (connection, transaction) => {
  try {
    const order = await Order(connection)
    const orderResponse = await order.findAll({
      attributes: [
        [fn('DISTINCT', col('customer_id')), 'customer_id'],
        'zone_id'
      ],
      order: [
        ['customer_id', 'ASC']
      ],
      transaction
    })

    const customerIds = orderResponse.filter((order) => order.customer_id).map((order) => order.customer_id)
    const customer = await Customer(connection)
    const customers = await customer.findAll({
      where: {
        id: {
          [Op.in]: customerIds
        }
      },
      order: [
        ['id', 'ASC']
      ],
      transaction
    })

    for (let i = 0; i < customers.length; i++) {
      customers[i].zone_id = orderResponse[i].zone_id
      await customers[i].save({ transaction })
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
    const response = await zoneUpdater(connection, transaction)
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