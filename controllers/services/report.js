const connection = require('../../utilities/connection')
const middlewares = require('../../utilities/middlewares')
const reportService = require('../../services/report')

module.exports = (router) => {
  router.get('/report/customer', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getCustomerCountValue(connection, req.query))
  })

  router.get('/report/zone', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getZoneCountValue(connection, req.query))
  })

  router.get('/report/customer/zone', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getCustomerZoneCount(connection, req.query))
  })

  router.get('/report/order', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getOrderCountValue(connection, req.query))
  })

  router.get('/report/order/product', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getMostSellingProducts(connection, req.query))
  })

  router.get('/report/products', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getProducts(connection, req.query))
  })

  router.get('/report/product/by', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getProductBy(connection, req.query))
  })

  router.get('/report/summary', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getSummary(connection, req.query))
  })

  router.get('/report/orders', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getOrders(connection, req.query))
  })

  router.get('/report/ratio', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getOrderCustomerRatio(connection, req.query))
  })

  router.get('/report/orders/zone', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getOrdersByZone(connection, req.query))
  })

  router.get('/report/orders/driver', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getOrdersByDriver(connection, req.query))
  })

  router.get('/report/orders/active', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getOrdersByActiveDrivers(connection, req.query))
  })

  router.get('/report/income_statement', middlewares.authentication, async (req, res) => {
    res.json(await reportService.getIncomeStatement(connection, req.query))
  })
}
