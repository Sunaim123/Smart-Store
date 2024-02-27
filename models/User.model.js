const { DataTypes } = require('sequelize')
const Role = require('./Role.model')

const User = async (connection) => {
  const role = Role(connection)
  const user = connection.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    points: {
      type: DataTypes.INTEGER
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: role,
        key: 'id'
      }
    }
  }, {
    tableName: 'user',
    timestamps: false
  })

  user.belongsTo(role, {
    as: 'role',
    foreignKey: 'role_id'
  })

  return user
}


module.exports = User