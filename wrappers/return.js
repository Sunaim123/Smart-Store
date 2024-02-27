// const moment = require('moment')
const { Op, fn, col } = require('sequelize')
const constants = require('../utilities/constants')
const Return = require('../models/Return.model')


const createReturn = async (connection, payload) => {

  try {

    const returnModel = await Return(connection)
    const returnResponse = await returnModel.create(payload)

    return {
      status: true,
      return: returnResponse.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const deleteReturn = async (connection, id) => {

  try {
    if (!id) throw new Error('id missing from the request')

    const returnModel = await Return(connection)
    const response = await returnModel.destroy({
      where: { id },
    })


    return {
      status: true,
      return: `${response} row(s) affected`,
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
  if (params.return_status) where.return_status = {
    [Op.in]: constants.GENERAL_FUNCTIONS.TO_ARRAY(params.return_status)
  }
  return where
}

const getReturns = async (connection, params) => {
  try {
    const returnModel = await Return(connection)

    const response = await returnModel.findAll({
      where: getParams(params),
      order: [
        ['id', 'DESC']
      ],
    });
    return {
      status: true,
      returns: response
    };
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    };
  }
};

const getReturn = async (connection, id) => {
  try {
    if (!id) throw new Error('id missing from the request')

    const returnModel = Return(connection)
    const response = await returnModel.findOne({
        include: [{
          model: user,
          as: 'user',
          attributes: ['name']
        }],
      where: { id }
    })
    if (!response) throw new Error('return not found')

    return {
      status: true,
      return: response.toJSON()
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}
module.exports = {createReturn, deleteReturn, getReturns, getReturn};