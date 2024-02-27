const moment = require('moment')
const { DataTypes } = require('sequelize')
const User = require('./User.model')

const Session = async (connection) => {
  const user = await User(connection)

  const session = connection.define('session', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    login_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
    },
    expiry_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: moment().add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss.SSSSSS')
    },
    permissions: {
      type: DataTypes.TEXT
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: user,
        key: 'id'
      }
    }
  }, {
    tableName: 'session',
    timestamps: false
  })

  session.belongsTo(user, {
    as: 'user',
    foreignKey: 'user_id'
  })

  return session
}

module.exports = Session