const express = require('express')
const router = express.Router()

require('../controllers/api/user')(router)
require('../controllers/api/product')(router)
require('../controllers/api/order')(router)
require('../controllers/api/feedback')(router)
require('../controllers/api/return')(router)

module.exports = router
