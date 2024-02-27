const { Op } = require('sequelize')
const constants = require('../utilities/constants')
const Role = require('../models/Role.model')

const updateRole = async (connection, payload) => {
  try {
    if (!payload.id) throw new Error('id missing from the request')

    const role = Role(connection)
    const roleResponse = await role.findOne({
      where: { id: payload.id }
    })
    if (!roleResponse) throw new Error('role not found')

    if (payload.permissions) roleResponse.permissions = JSON.stringify(payload.permissions).replace(/ /g, '_')

    const response = await roleResponse.save()

    return {
      status: true,
      role: response.toJSON(),
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error),
    }
  }
}


const getParams = (params) => {
  const where = {
    id: { [Op.gt]: 0 }
  }

  if (params.id && params.id > 0) where.id = params.id
  if (params.name) where.name = params.name

  return where
}

const getRoles = async (connection, params) => {
  try {
    const role = Role(connection)
    const response = await role.findAll({
      where: getParams(params),
      order: [
        ['id', 'ASC']
      ]
    })

    return {
      status: true,
      roles: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const getRole = async (connection, id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const role = Role(connection)
    const response = await role.findOne({
      where: { id }
    })
    if (!response) throw new Error('role not found')

    const parsedPermissions = response.permissions.replace(/_/g, ' ')

    return {
      status: true,
      role: {...response.toJSON(),
              permissions: parsedPermissions}
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

module.exports = { updateRole, getRoles, getRole }