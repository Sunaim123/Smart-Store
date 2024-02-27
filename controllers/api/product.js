const connection = require('../../utilities/connection')
const middlewares = require('../../utilities/middlewares')
const productWrapper = require('../../wrappers/product')
const path = require('path')
const multer = require('multer')


const storage = multer.diskStorage({
  destination: 'public/uploads/products',
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-product${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage }).single('thumbnail')

module.exports = (router) => {
  router.post('/product', async (req, res) => {
    upload(req, res, async (error) => {
      if (error) {
        res.json({ status: false, message: error })
      } else {
        req.body.thumbnail = req.file && req.file.path
        res.json(await productWrapper.createProduct(connection, req.body))
      }
    })
  })

  router.put('/product',middlewares.authentication, async (req, res) => {
    upload(req, res, async (error) => {
      if (error) {
        res.json({ status: false, message: error })
      } else {
        req.body.thumbnail = req.file && req.file.path
        res.json(await productWrapper.updateProduct(connection, req.body))
      }
    })
  })

  router.delete('/product/:id',middlewares.authentication, async (req, res) => {
    res.json(await productWrapper.deleteProduct(connection, parseInt(req.params.id)))
  })

  router.get('/products', async (req, res) => {
    res.json(await productWrapper.getProducts(connection, req.query))
  })

  router.get('/product', async (req, res) => {
    res.json(await productWrapper.getProduct(connection, parseInt(req.query.id)))
  })

  router.get('/recommended_product',middlewares.authentication, async (req, res) => {
    res.json(await productWrapper.recommendProducts(connection, parseInt(req.user_id)))
  })
}
