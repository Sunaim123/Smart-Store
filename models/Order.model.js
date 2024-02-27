const moment = require('moment')
const { DataTypes } = require('sequelize')
const User = require('./User.model')


const Order = async (connection) => {
  const user = await User(connection)
  const order = connection.define('order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    total: {
      type: DataTypes.FLOAT
    },
    note: {
      type: DataTypes.TEXT
    },
    address: {
      type: DataTypes.TEXT
    },
    order_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'punched'
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'unpaid'
    },
    order_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:1,
      references: {
        model: user,
        key: 'id'
      }
    }
  }, {
    tableName: 'order',
    timestamps: false
  })
  
  order.belongsTo(user, {
    as: 'user',
    foreignKey: 'user_id'
  })

  return order
}

module.exports = Order