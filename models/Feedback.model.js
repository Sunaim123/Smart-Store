const { DataTypes } = require('sequelize')
const User = require('./User.model')

const Feedback = async (connection) => {
  const user = await User(connection)
  const feedback = connection.define('feedback', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    problem: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    result: {
      type: DataTypes.TEXT,
    },
    order_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: user,
        key: 'id'
      }
    }
  }, {
    tableName: 'feedback',
    timestamps: false
  })

  feedback.belongsTo(user, {
    as: 'user',
    foreignKey: 'user_id'
  })

  return feedback
}

module.exports = Feedback