const connection = require('../utilities/connection')
const constants = require('../utilities/constants')
const Order = require('../models/Order.model')
const orderWrapper = require('../wrappers/order')

const orderUpdater = async (connection, transaction) => {
  try {
    const response = await orderWrapper.getOrders(connection, {})
    if (!response.status) throw new Error(response.message)

    for (let i = 0; i < response.orders.length; i++) {
      const cost = response.orders[i].order_lineitems.reduce((previous, current) => previous += current.quantity * current.cost, 0)
      const total = response.orders[i].order_lineitems.reduce((previous, current) => {
        previous += current.quantity * (current.type === "deal" ? (current.sale + current.products.reduce((previous, current) => previous += current.swap || 0, 0)) : current.price)

        return previous
      }, 0)

      const order = await Order(connection)
      const orderResponse = await order.update({
        cost: cost,
        total: total,
        commission: response.orders[i].driver ? response.orders[i].driver.commission : 0,
      }, {
        where: {
          id: response.orders[i].id
        }
      })
    }

    return {
      status: true,
      message: `${response.orders.length} rows affected`
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
    const response = await orderUpdater(connection, transaction)
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