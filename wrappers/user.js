const omit = require('lodash/omit')
const { Op } = require('sequelize')
const constants = require('../utilities/constants')
const User = require('../models/User.model')
const Role = require('../models/Role.model')
const sessionWrapper = require('./session')

const createUser = async (connection, payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['name', 'username', 'password'], payload)
    if (message.length) throw new Error(`${message.join(', ')} missing from the request`)

    const passcode = await constants.GENERAL_FUNCTIONS.ENCRYPT_PASSWORD(payload.password)

    const user = await User(connection)
    const response = await user.create({
      ...payload,
       password: passcode,
       role_id: 2
})

    return {
      status: true,
      user: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const updateUser = async (connection, payload) => {
  try {
    if (!payload.id) throw new Error('id missing from the request')

    const user = await User(connection)
    const userResponse = await user.findOne({
      where: { id: payload.id }
    })
    if (!userResponse) throw new Error('user not found')
    if (payload.name) userResponse.name = payload.name
    if (payload.points) userResponse.points = payload.points
    if (payload.password && userResponse.password !== payload.password) 
    {userResponse.password = await constants.GENERAL_FUNCTIONS.ENCRYPT_PASSWORD(payload.password)}

    const response = await userResponse.save()

    return {
      status: true,
      user: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const deleteUser = async (connection, id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const user = await User(connection)
    const response = await user.destroy({
      where: { id }
    })

    return {
      status: true,
      user: response
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

  if (params.id) where.id = params.id
  if (params.ids) where.id = {
    [Op.in]: constants.GENERAL_FUNCTIONS.TO_ARRAY(params.ids)
  }
  if (params.name) where.name = {
    [Op.iLike]: `%${params.name}%`
  }
  if (params.mobile) where.mobile = {[Op.iLike]: params.mobile}

  return where
}

const getUsers = async (connection, params) => {
  try {
    const user = await User(connection)
    const response = await user.findAll({
      attributes: ['id', 'name', 'username', 'mobile'],
      where: getParams(params),
      order: [
        ['id', 'ASC']
      ]
    })

    return {
      status: true,
      users: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getUser = async (connection, id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const role = Role(connection) 
    const user = await User(connection)
    const response = await user.findOne({
      include: [{
        model: role,
        as: 'role',
        attributes: ['name', 'permissions']
      }],
      where: { id }
    })
    if (!response) throw new Error('user not found')

    return {
      status: true,
      user: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const login = async (connection, payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['username', 'password'], payload)
    if (message.length) throw new Error(`${message.join(', ')} missing from the request`)
    
    const role = Role(connection) 
    const user = await User(connection)
    const response = await user.findOne({
      include: [{
        model: role,
        as: 'role',
        attributes: ['name', 'permissions']
      }],
      where: { username: payload.username }
    })
    if (!response) throw new Error('Invalid username or password')

    const comparison = await constants.GENERAL_FUNCTIONS.COMPARE_PASSWORD(payload.password, response.password)
    if (!comparison) throw new Error('Invalid username or password')
    
    let sessionResponse = await sessionWrapper.getSession(connection, response.id)
    
    if (!sessionResponse.status) {
      sessionResponse = await sessionWrapper.createSession(connection, { user_id: response.id, permissions: response.role.permissions })
      if (!sessionResponse.status) throw new Error(sessionResponse.message)

      sessionResponse = sessionResponse.session
    } else {
      const token = sessionResponse.session.token
      const validate = await sessionWrapper.validateSession(connection, token)
      
      if (validate.status) {
        sessionResponse = await sessionWrapper.updateSessionTimestamps(connection, response.id)
        if (!sessionResponse.status) throw new Error(sessionResponse.message)
        
        sessionResponse = sessionResponse.session
      } else {
        sessionResponse = await sessionWrapper.updateSession(connection, { user_id: response.id, permissions: response.role.permissions })
        if (!sessionResponse.status) throw new Error(sessionResponse.message)
        
        sessionResponse = sessionResponse.session
      }
    }
    
    const roleResponse = omit(response.role.toJSON(), ['permissions'])
    const userResponse = {
      ...omit(response.toJSON(), ['password']),
      role: roleResponse
    }

    return {
      status: true,
      user: userResponse,
      token: sessionResponse.token,
      permissions: response.role.permissions,
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

module.exports = { createUser, updateUser, deleteUser, getUsers, getUser, login }