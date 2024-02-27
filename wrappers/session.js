const moment = require('moment')
const { Op } = require('sequelize')
const constants = require('../utilities/constants')
const User = require('../models/User.model')
const Session = require('../models/Session.model')

const createSession = async (connection, payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['user_id', 'permissions'], payload)
    if (message.length) throw new Error(`${message.join(', ')} missing from the request`)

    payload.token = constants.GENERAL_FUNCTIONS.GET_TOKEN()
    payload.login_timestamp = moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
    payload.expiry_timestamp = moment().add(30, 'days').format('YYYY-MM-DD HH:mm:ss.SSSSSS')

    const session = await Session(connection)
    const response = await session.create(payload)

    return {
      status: true,
      session: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getSession = async (connection, user_id) => {
  try {
    if (!user_id) throw new Error('user id missing from the request')

    const session = await Session(connection)
    const response = await session.findOne({
      attributes: ['token', 'permissions'],
      where: { user_id }
    })
    if (!response) throw new Error('session not found')
    console.log(response);

    return {
      status: true,
      session: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const updateSession = async (connection, payload) => {
  try {
    if (!payload.user_id) throw new Error('user id missing from the request')

    const session = await Session(connection)
    const sessionResponse = await session.findOne({
      attributes: ['id', 'token', 'login_timestamp', 'expiry_timestamp'],
      where: { user_id: payload.user_id }
    })
    if (!sessionResponse) throw new Error('session not found')

    sessionResponse.token = constants.GENERAL_FUNCTIONS.GET_TOKEN()
    sessionResponse.login_timestamp = moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
    sessionResponse.expiry_timestamp = moment().add(30, 'days').format('YYYY-MM-DD HH:mm:ss.SSSSSS')

    const response = await sessionResponse.save()

    return {
      status: true,
      session: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const deleteSession = async (connection, token) => {
  try {
    if (!token) throw new Error('token missing from the request')

    const session = await Session(connection)
    const sessionResponse = await session.findOne({
      attributes: ['id', 'expiry_timestamp'],
      where: { token }
    })
    if (!sessionResponse) throw new Error('session not found')

    sessionResponse.expiry_timestamp = moment().subtract(1, 'minute').format('YYYY-MM-DD HH:mm:ss.SSSSSS')

    const response = await sessionResponse.save()

    return {
      status: true,
      session: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const updateSessionTimestamps = async (connection, user_id) => {
  try {
    if (!user_id) throw new Error('user id missing from the request')

    const session = await Session(connection)
    const sessionResponse = await session.findOne({
      attributes: ['id', 'token', 'expiry_timestamp'],
      where: { user_id }
    })
    if (!sessionResponse) throw new Error('session not found')

    sessionResponse.expiry_timestamp = moment().add(30, 'days').format('YYYY-MM-DD HH:mm:ss.SSSSSS')
    const response = await sessionResponse.save()

    return {
      status: true,
      session: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const validateSession = async (connection, token) => {
  try {
    if (!token) throw new Error('token missing from the request')

    const session = await Session(connection)
    const user = await User(connection)

    const response = await session.findOne({
      attributes: ['permissions', 'user_id'],
      include: [{
        model: user,
        as: 'user',
        attributes: ['id', 'role_id']
      }],
      where: {
        token,
        login_timestamp: {
          [Op.lte]: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
        },
        expiry_timestamp: {
          [Op.gte]: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
        },
      }
    })
    if (!response) throw new Error('session expired')
    if (!response.user) throw new Error('session expired')

    return {
      status: true,
      session: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

module.exports = { createSession, getSession, updateSession, deleteSession, updateSessionTimestamps, validateSession }