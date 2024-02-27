const connection = require('../../utilities/connection')
const middlewares = require('../../utilities/middlewares')
const userWrapper = require('../../wrappers/user')
const sessionWrapper = require('../../wrappers/session')

module.exports = (router) => {

  router.post('/user', async (req, res) => {
    res.json(await userWrapper.createUser(connection, req.body))
  })

  router.put('/user', async (req, res) => {
    res.json(await userWrapper.updateUser(connection, req.body))
  })

  router.delete('/user/:id', middlewares.authentication, async (req, res) => {
    res.json(await userWrapper.deleteUser(connection, parseInt(req.params.id)))
  })

  router.get('/users', middlewares.authentication, async (req, res) => {
    res.json(await userWrapper.getUsers(connection, req.query))
  })

  router.get('/user', middlewares.authentication, async (req, res) => {
    res.json(await userWrapper.getUser(connection, parseInt(req.query.id)))
  })

  router.post('/user/login', async (req, res) => {
    res.json(await userWrapper.login(connection, req.body))
    })

  router.post('/user/logout', async (req, res) => {
    res.json(await sessionWrapper.deleteSession(connection, req.body.token))
  })

  router.post('/user/validate', async (req, res) => {
    res.json(await sessionWrapper.validateSession(connection, req.body.token))
  })
}
