const { Op } = require('sequelize')
const constants = require('../utilities/constants')
const Feedback = require('../models/Feedback.model')
const emailService = require('../services/email')
const fsPromises = require('fs/promises')

const createFeedback = async (connection, payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['name', 'email', 'problem'], payload)
    if (message.length) throw new Error(`${message.join(', ')} missing from the request`)

    const feedback = await  Feedback(connection)
    const response = await feedback.create(payload)

    payload.id = response.id

    return {
      status: true,
      feedback: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const updateFeedback = async (connection, payload) => {
  try {
    if (!payload.id) throw new Error('id missing from the request')
    const feedback = await Feedback(connection)
    const feedbackResponse = await feedback.findOne({
      where: { id: payload.id }
    })
    if (!feedbackResponse) throw new Error('feedback not found')

    if (payload.status) feedbackResponse.status = payload.status
    if (payload.name) feedbackResponse.name = payload.name
    if (payload.email) feedbackResponse.email = payload.email
    if (payload.problem) feedbackResponse.problem = payload.problem
    if (payload.result) feedbackResponse.result = payload.result
    const response = await feedbackResponse.save()

    return {
      status: true,
      feedback: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const deleteFeedback = async (connection, id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const feedback = await Feedback(connection)
    const feedbackResponse = await feedback.findOne({
      where: { id }
    })

    const response = await feedbackResponse.destroy()

    return {
      status: true,
      feedback: `${response} row(s) affected`
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getParams = (params) => {
  const where = {}

  if (params.id) where.id = {
    [Op.in]: constants.GENERAL_FUNCTIONS.TO_ARRAY(params.id)
  }
  if (params.result) where.result = params.result
  if (params.status) where.status = params.status
  if (params.name) where.name = params.name
  if (params.email) where.email = params.email
  if (params.problem) where.problem = params.problem

  return where
}

const getFeedbacks = async (connection, params) => {
  try {
    const feedback = await Feedback(connection)

    const response = await feedback.findAndCountAll({
      where: getParams(params)
    })
    if (!response) throw new Error('feedback not found')

    return {
      status: true,
      count: response.count,
      feedbacks: response.rows
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getFeedback = async (connection, id, companyId) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const feedback = await Feedback(connection)
    const response = await feedback.findOne({
      where: { id }
    })
    if (!response) throw new Error('feedback not found')
    if (companyId && response.company_id !== companyId) throw new Error('feedback not found')
    
    return {
      status: true,
      feedback: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

module.exports = { createFeedback, updateFeedback, deleteFeedback, getFeedbacks, getFeedback }