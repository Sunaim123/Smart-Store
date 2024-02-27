const { QueryTypes } = require('sequelize')
const connection = require('../utilities/connection')
const constants = require('../utilities/constants')
const OrderLineItem = require('../models/OrderLineItem.model')

const dealUpdater = async (connection, transaction) => {
  try {
    let count = 0
    const query = `SELECT ol.id, d.cost, d.price, d.discount FROM public.order_lineitem ol INNER JOIN public.deal d ON ol.deal_id = d.id;`
    const response = await connection.query(query, { type: QueryTypes.SELECT })

    const orderLineitem = await OrderLineItem(connection)
    for (let i = 0; i < response.length; i++) {
      count++
      await orderLineitem.update({
        deal_cost: response[i].cost,
        deal_price: response[i].price,
        deal_discount: response[i].discount
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
    const response = await dealUpdater(connection, transaction)
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