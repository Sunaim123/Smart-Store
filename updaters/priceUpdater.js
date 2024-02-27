const { QueryTypes } = require('sequelize')
const connection = require('../utilities/connection')
const constants = require('../utilities/constants')
const OrderLineItem = require('../models/OrderLineItem.model')

const priceUpdater = async (connection, transaction) => {
  try {
    let count = 0
    const query = `SELECT ol.id, p.cost, p.price FROM public.order_lineitem ol INNER JOIN public.product p ON ol.product_id = p.id;`
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    const orderLineitem = await OrderLineItem(connection)
    for (let i = 0; i < response.length; i++) {
      count++
      await orderLineitem.update({
        cost: response[i].cost,
        price: response[i].price
      }, {
        where: {
          id: response[i].id
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
    const response = await priceUpdater(connection, transaction)
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