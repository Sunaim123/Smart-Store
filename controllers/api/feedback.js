const connection = require('../../utilities/connection')
const middlewares = require('../../utilities/middlewares')
const feedbackWrapper = require('../../wrappers/feedback')

module.exports = (router) => {
  router.post('/feedback',middlewares.authentication, async (req, res) => {
    res.json(await feedbackWrapper.createFeedback(connection, {...req.body, user_id: req.user_id}))
  })

  router.put('/feedback',middlewares.authentication, async (req, res) => {
    res.json(await feedbackWrapper.updateFeedback(connection, req.body))
  })

  router.delete('/feedback/:id',middlewares.authentication, async (req, res) => {
    res.json(await feedbackWrapper.deleteFeedback(connection, parseInt(req.params.id)))
  })

  router.get('/feedbacks',middlewares.authentication, async (req, res) => {
    res.json(await feedbackWrapper.getFeedbacks(connection, req.query))
  })

  router.get('/feedback', middlewares.authentication, async (req, res) => {
    res.json(await feedbackWrapper.getFeedback(connection, parseInt(req.query.id)))
  })
}