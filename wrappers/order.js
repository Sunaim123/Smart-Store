const moment = require('moment')
const { Op } = require('sequelize')
const constants = require('../utilities/constants')
const User = require('../models/User.model')
const Order = require('../models/Order.model')
const OrderLineItem = require('../models/OrderLineItem.model')
const Product = require('../models/Product.model')

const createOrder = async (connection, payload) => {
  const transaction = await connection.transaction()
  try {
    const orderMessage = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS([/*'order_datetime'*/], payload?.order || {})
    const orderLineItemMessage = constants.GENERAL_FUNCTIONS.FORMAT_BULK_REQUIRED_FIELDS(['quantity'], payload?.order_lineitems || [])

    const message = [
      ...orderMessage,
      ...orderLineItemMessage
    ]
    if (message.length) throw new Error(`${message.join(', ')} missing from the request`)

    const {
      order: orderPayload,
      order_lineitems: orderLineItemsPayload
    } = payload

    const order = await Order(connection)
    const response = await order.create({
      ...orderPayload,
      user_id: payload.user_id
    }, {transaction})

    const orderLineItem = await OrderLineItem(connection)
    const orderLineItemResponse = await orderLineItem.bulkCreate(
      orderLineItemsPayload.map((item) => ({
        ...item,
        order_id: response.id
      })), { transaction })

    await transaction.commit()

    return {
      status: true,
      order: response.toJSON(),
      order_lineitems: orderLineItemResponse.map((orderLineItem) => orderLineItem.toJSON())
    }
  } catch (error) {

    await transaction.rollback()

    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const deleteOrder = async (connection, id) => {
  const transaction = await connection.transaction()

  try {
    if (!id) throw new Error('id missing from the request')

    const orderLineItem = await OrderLineItem(connection)
    const orderLineItemResponse = await orderLineItem.destroy({
      where: { order_id: id },
      transaction
    })

    const order = await Order(connection)
    const orderResponse = await order.destroy({
      where: { id },
      transaction
    })

    await transaction.commit()

    return {
      status: true,
      order: `${orderResponse} row(s) affected`,
      order_lineitems: `${orderLineItemResponse} row(s) affected`
    }
  } catch (error) {
    await transaction.rollback()

    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getParams = (params) => {
  const where = {}

  if (params.id) where.id = {
    [Op.in]: constants.GENERAL_FUNCTIONS.TO_ARRAY(params.id)
  }
  if (params.user_id) where.user_id = params.user_id
  if (params.order_status) where.order_status = {
    [Op.in]: constants.GENERAL_FUNCTIONS.TO_ARRAY(params.order_status)
  }
  if (params.payment_status) where.payment_status = {
    [Op.in]: constants.GENERAL_FUNCTIONS.TO_ARRAY(params.payment_status)
  }

  if (params.order_datetime) where.order_datetime = params.order_datetime
  if (params.from_order_date && params.to_order_date) where.order_datetime = {
    [Op.between]: [params.from_order_date, params.to_order_date]
  }
  if (params.from_order_datetime && params.to_order_datetime) where.order_datetime = {
    [Op.between]: [params.from_order_datetime, params.to_order_datetime]
  }
  if (params.user_id) where.user_id = params.user_id
  if (params.user) where[Op.or] = {
    ['$user.name$']: params.user,
    ['$user.mobile$']: params.user
  }
  if (params.mobile) where.mobile = {[Op.iLike]: params.mobile}
  if (params.name) where['$user.name$'] = params.name

  if (params.username) where['$driver.username$'] = params.username

  return where
}

const getOrders = async (connection, params) => {
  try {
    console.log(params);

    const user = await User(connection)
    const order = await Order(connection)
    const orderLineItem = await OrderLineItem(connection)
    const product = await Product(connection)

    order.hasMany(orderLineItem, {
      as: 'order_lineitems',
      foreignKey: 'order_id'
    })
    
    const response = await order.findAll({
      where: getParams(params),
      order: [
        ['id', 'DESC']
      ]
    })

    return {
      status: true,
      orders: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getOrder = async (connection, id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const order = await Order(connection)
    const orderLineItem = await OrderLineItem(connection)
    const product = await Product(connection)

    order.hasMany(orderLineItem, {
      as: 'order_lineitems',
      foreignKey: 'order_id'
    })

    const response = await order.findOne({
      include: [{
        model: orderLineItem,
        as: 'order_lineitems',
        include: [{
          model: product,
          as: 'product',
        }]
      }],
      where: { id }
    })
    if (!response) throw new Error('order not found')

    
    return {
      status: true,
      order: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const payOrder = async (connection, id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const order = await Order(connection)
    await order.update({
      payment_status: 'paid'
    }, {
      where: {
        id: {
          [Op.in]: constants.GENERAL_FUNCTIONS.TO_ARRAY(id)
        }
      }
    })

    return {
      status: true,
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

module.exports = { createOrder, deleteOrder, getOrders, getOrder, payOrder }