const connection = require('../../utilities/connection')
const middlewares = require('../../utilities/middlewares')
const orderWrapper = require('../../wrappers/order')

module.exports = (router) => {
  router.post('/order',middlewares.authentication, async (req, res) => {
    res.json(await orderWrapper.createOrder(connection, { ...req.body, user_id: req.user_id }))
  })

  router.delete('/order/:id',middlewares.authentication, async (req, res) => {
    res.json(await orderWrapper.deleteOrder(connection, parseInt(req.params.id)))
  })

  router.get('/orders',middlewares.authentication, async (req, res) => {
    res.json(await orderWrapper.getOrders(connection, req.query))
  })

  router.get('/order', middlewares.authentication, async (req, res) => {
    res.json(await orderWrapper.getOrder(connection, parseInt(req.query.id)))
  })

  router.patch('/order/pay', middlewares.authentication, async (req, res) => {
    res.json(await orderWrapper.payOrder(connection, req.body.id))
  })
}
