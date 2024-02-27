const express = require('express')
const router = express.Router()

require('../controllers/services/report')(router)

module.exports = router
