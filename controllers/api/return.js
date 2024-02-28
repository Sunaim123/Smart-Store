const path = require('path')
const multer = require('multer')
const connection = require('../../utilities/connection')
const middlewares = require('../../utilities/middlewares')
const returnWrapper = require('../../wrappers/return')

const storage = multer.diskStorage({
  destination: 'public/uploads/returns',
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}${Math.floor(Math.random() * 9)}-return${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage }).fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
])
module.exports = (router) => {
  router.post('/return',middlewares.authentication, async (req, res) => {
    upload(req, res, async (error) => {
      if (error) {
        res.json({ status: false, message: error })
      } else {
        req.body.image1 = req.files['image1'] && req.files['image1'][0].path
        req.body.image2 = req.files['image2'] && req.files['image2'][0].path
        req.body.user_id = req.user_id

        res.json(await returnWrapper.createReturn(connection, req.body))
      }
    })
  })
  
  router.delete('/return/:id',middlewares.authentication, async (req, res) => {
    res.json(await returnWrapper.deleteReturn(connection, parseInt(req.params.id)))
  })

  router.get('/returns',middlewares.authentication, async (req, res) => {
    res.json(await returnWrapper.getReturns(connection, req.query))
  })

  router.get('/return', middlewares.authentication, async (req, res) => {
    res.json(await returnWrapper.getReturn(connection, parseInt(req.query.id)))
  })
}
