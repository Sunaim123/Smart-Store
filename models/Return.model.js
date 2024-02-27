const moment = require('moment')
const { DataTypes } = require('sequelize')
const User = require('./User.model')

const Return = async (connection) => {
  const user = await User(connection)
  const returnModel = await connection.define('return', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    return_reason: {
      type: DataTypes.TEXT
    },
    image1: {
      type: DataTypes.TEXT
    },
    image2: {
      type: DataTypes.TEXT
    },
    return_status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'Pending'
    },
    return_date: {
      type: DataTypes.DATE,
      defaultValue: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: user,
        key: 'id'
      },
      allowNull: false
    },
  }, {
    tableName: 'return',
    timestamps: false
  })

  returnModel.belongsTo(user, {
    as: 'user',
    foreignKey: 'user_id'
  })

  return returnModel
}

module.exports = Return