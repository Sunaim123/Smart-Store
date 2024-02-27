const { DataTypes } = require('sequelize')

const Role = (connection) => {
  const role = connection.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50)
    },
    permissions: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'role',
    timestamps: false
  })

  return role
}

module.exports = Role