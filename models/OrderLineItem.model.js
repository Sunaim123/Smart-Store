const { DataTypes } = require('sequelize')
const Product = require('./Product.model')
const Order = require('./Order.model')

const OrderLineItem = async (connection) => {
  const product = await Product(connection)
  const order = await Order(connection)

  const orderLineItem = connection.define('order_lineitem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: product,
        key: 'id'
      }
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: order,
        key: 'id'
      }
    }
  }, {
    tableName: 'order_lineitem',
    timestamps: false
  })

  orderLineItem.belongsTo(product, {
    as: 'product',
    foreignKey: 'product_id'
  })

  orderLineItem.belongsTo(order, {
    as: 'order',
    foreignKey: 'order_id'
  })

  return orderLineItem
}

module.exports = OrderLineItem