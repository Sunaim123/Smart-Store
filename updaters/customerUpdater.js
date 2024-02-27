const connection = require('../utilities/connection')
const constants = require('../utilities/constants')
const Customer = require('../models/Customer.model')
const Order = require('../models/Order.model')
const OrderLineItem = require('../models/OrderLineItem.model')

const formatOrder = (orders) => {
  const ordersResponse = []

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i].toJSON()
    const orderLineItemsResponse = []

    for (let j = 0; j < order.order_lineitems.length; j++) {
      const orderLineitem = order.order_lineitems[j]
      if (!orderLineitem.deal_id) {
        orderLineItemsResponse.push({
          type: 'product',
          price: orderLineitem.price * orderLineitem.quantity
        })
      } else {
        const index = orderLineItemsResponse.findIndex(deal => deal.id === orderLineitem.deal_id)

        if (index === -1) {
          orderLineItemsResponse.push({
            id: orderLineitem.deal_id,
            type: 'deal',
            price: orderLineitem.deal_price * orderLineitem.deal_quantity - orderLineitem.deal_discount
          })
        }
      }
    }

    order.price = orderLineItemsResponse.reduce((p, c) => p += c.price, 0)
    ordersResponse.push(order)
  }

  return ordersResponse.map(o => ({
    customer_id: o.customer_id,
    price: o.price - o.discount
  }))
}

const customerUpdater = async (connection, transaction) => {
  try {
    const customer = await Customer(connection)
    const order = await Order(connection)
    const orderLineItem = await OrderLineItem(connection)
    order.hasMany(orderLineItem, {
      as: 'order_lineitems',
      foreignKey: 'order_id'
    })

    const customers = await customer.findAll({
      attributes: ['id'],
      transaction
    })
    const customersIds = customers.map(c => c.id)

    for (let i = 0; i < customers.length; i++) {
      const orders = await order.findAll({
        include: [{
          model: orderLineItem,
          as: 'order_lineitems'
        }],
        where: {
          customer_id: customers[i].id
        },
        transaction
      })

      customers[i].spent = formatOrder(orders).price
      const response = customers[i].save({ transaction })
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
    const response = await customerUpdater(connection, transaction)
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