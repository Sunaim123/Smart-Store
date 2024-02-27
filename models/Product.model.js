const { DataTypes } = require('sequelize')

const Product = async (connection) => {

  const product = connection.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    thumbnail:{
      type: DataTypes.TEXT
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    niche: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'grocery'
    }
  }, {
    tableName: 'product',
    timestamps: false
  })

  return product
}

module.exports = Product