const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')

const apiRouter = require('./routes/api')
const serviceRouter = require('./routes/service')

const app = express()

app.use(cors())
app.use(compression())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET')

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', true)

  next()
})
app.use(logger('dev'))
app.use(bodyParser.json({ limit: '4mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '4mb', extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', apiRouter)
app.use('/service', serviceRouter)

app.use((req, res, next) => {
  next(res.sendStatus(404))
})

app.use((error, req, res, next) => {
  res.json({
    status: error.status || 500,
    message: error.message,
    error: error
  })
})

module.exports = app
