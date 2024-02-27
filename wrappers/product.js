const { Op } = require('sequelize')
const constants = require('../utilities/constants')
const Product = require('../models/Product.model')
const User = require('../models/User.model')
const Order = require('../models/Order.model')
const OrderLineItem = require('../models/OrderLineItem.model')

const createProduct = async (connection, payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['title', 'description', 'price', 'thumbnail'], payload)
    if (message.length) throw new Error(`${message.join(', ')} missing from the request`)

    const product = await Product(connection)
    const response = await product.create(payload)

    return {
      status: true,
      product: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const updateProduct = async (connection, payload) => {
  try {
    if (!payload.id) throw new Error('id missing from the request')

    const product = await Product(connection)
    const productResponse = await product.findOne({
      where: { id: payload.id }
    })
    if (!productResponse) throw new Error('product not found')

    if (payload.title) productResponse.title = payload.title
    if (payload.description) productResponse.description = payload.description
    if (payload.price) productResponse.price = payload.price
    if (payload.quantity) productResponse.quantity = payload.quantity
    if (payload.thumbnail) productResponse.thumbnail = payload.thumbnail

    const response = await productResponse.save()

    return {
      status: true,
      product: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const deleteProduct = async (connection, id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const product = await Product(connection)
    const response = await product.destroy({
      where: { id }
    })

    return {
      status: true,
      product: `${response} row(s) affected`
    }
  } catch (error) {
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
  if (params.price)
    switch (params.price) {
      case '1':
        where.price = {
          [Op.gte]: 0,
          [Op.lte]: 1000
        }
        break;
      case '2':
        where.price = {
          [Op.gte]: 1000,
          [Op.lte]: 2000
        }
        break;
      case '3':
        where.price = {
          [Op.gte]: 2000,
          [Op.lte]: 3000
        }
        break;
      case '0':
        where.price
        break;
      default:
        break
    }
  if (params.query) where[Op.or] = {
    title: {
      [Op.iLike]: `%${params.query}%`
    },
    niche: {
      [Op.iLike]: `%${params.query}%`
    }
  }
  if (params.niche)
    switch (params.niche) {
      case '1':
        where.niche = 'grocery'
        break;
      case '0':
        where.niche = 'medicine'
        break;
      default:
        break
    }
  if (params.category) where.category = params.category
  if (params.limit) where.limit = params.limit

  return where
}

const getProducts = async (connection, params) => {
  try {
    const product = await Product(connection)
    const response = await product.findAll({
      where: getParams(params),
      order: [
        ['id', 'ASC']
      ]
    })

    return {
      status: true,
      products: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getProduct = async (connection, id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const product = await Product(connection)
    const response = await product.findOne({
      where: { id }
    })
    if (!response) throw new Error('product not found')

    const category = await product.findAll({
      where: {
        title: { [Op.iLike]: `%${response.title.split(' ')[0]}%` },
        niche: response.niche,
        category: { [Op.not]: response.category },
      },
      limit: 8
    })
    if (!category) throw new Error('product not found')

      const nicheMatchProducts = await product.findAll({
        where: {
          niche: response.niche,
          category: { [Op.not]: response.category },
        },
        limit: 8
      });
      if (!nicheMatchProducts) throw new Error('product not found');

      return {
        status: true,
        product: response.toJSON(),
        category: category.length > 0? category.map(cat => cat.toJSON()) : nicheMatchProducts.map(x => x.toJSON())
      }
    } catch (error) {
      return {
        status: false,
        message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
      }
    }
  }

const recommendProducts = async (connection, id) => {
    try {
      if (!id) throw new Error('id missing from the request')

      const order = await Order(connection)
      const orderLineItem = await OrderLineItem(connection)
      const product = await Product(connection)

      order.hasMany(orderLineItem, {
        as: 'order_lineitems',
        foreignKey: 'order_id'
      })

      const orderResponse = await order.findAll({
        include: [{
          model: orderLineItem,
          as: 'order_lineitems',
          include: [{
            model: product,
            as: 'product',
          }]
        }],
        where: { user_id: id }
      })
      if (!orderResponse) throw new Error('order not found')
      
      const orderProducts = orderResponse.reduce((acc, curr) => {
        acc.push(...curr.order_lineitems.map(item => item.product));
        return acc;
      }, [])

      const titleProducts = await product.findAll({
        where: { title: { [Op.iLike]: `%${orderProducts.map(product => product.title)}%` } }
      })

      const categoryProducts = await product.findAll({
        where: { niche: { [Op.in]: orderProducts.map(product => product.niche) } }
      })

      const remainingProducts = await product.findAll({
        where: {
          id: {
            [Op.notIn]: [...orderProducts.map(product => product.id), ...categoryProducts.map(product => product.id), ...titleProducts.map(product => product.id)]
          }
        }
      })

       const recommendedProducts = [ ...titleProducts, ...orderProducts, ...categoryProducts, ...remainingProducts];

      return {
        status: true,
        products: recommendedProducts
      }
    } catch (error) {
      return {
        status: false,
        message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
      }
    }
  }

  module.exports = { createProduct, updateProduct, deleteProduct, getProducts, getProduct, recommendProducts }