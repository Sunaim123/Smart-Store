const connection = require('./connection')
const constants = require('./constants')
const User = require('../models/User.model')
const Product = require('../models/Product.model')
const thumbnail = require('./thumbnail')

const createUser = async (connection, transaction) => {
  try {
    const password = await constants.GENERAL_FUNCTIONS.ENCRYPT_PASSWORD('sunaim123')
    const user = await User(connection)
    const response = await user.create({
      id: 1,
      name: 'Sunaim',
      username: 'sunaim',
      password: password,
      mobile: '090078601'
    }, {
      transaction
    })

    return {
      status: true,
      user: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const createProducts = async (connection, transaction) => {
  try {
    const product = await Product(connection)
    const response = await product.bulkCreate([
      { id: 1, title: 'Phonics Handwash 500ML (Purple)', description: 'To be added', quantity: 2, price: 220.00, thumbnail, category: 1 },
      { id: 2, title: 'Phonics BodyWash 500ML', description: 'To be added', quantity: 2, price: 250.00, thumbnail, category: 1 },
      { id: 3, title: 'Phonics White Perfume Phenyl 500ML Concentrated', description: 'To be added', quantity: 2, price: 200.00, thumbnail, category: 1 },
      { id: 4, title: 'Phonics Handwash 500ML (Black)', description: 'To be added', quantity: 2, price: 220.00, thumbnail, category: 1 },
      { id: 5, title: 'Phonics Color Bleach 600ML', description: 'To be added', quantity: 2, price: 200.00, thumbnail, category: 1 },
      { id: 6, title: 'Bodywash', description: 'To be added', quantity: 2, price: 250.00, thumbnail, category: 1 },
      { id: 7, title: 'Phonics Detergent Powder 1KG', description: 'To be added', quantity: 2, price: 280.00, thumbnail, category: 1 },
      { id: 8, title: 'Phonics Thick Gel Bleach 500ML', description: 'To be added', quantity: 2, price: 220.00, thumbnail, category: 1 },
      { id: 9, title: 'Phonics Dishwashing Liquid 500ML', description: 'To be added', quantity: 2, price: 160.00, thumbnail, category: 1 },
      { id: 10, title: 'Phonics Degreaser', description: 'To be added', quantity: 2, price: 270.00, thumbnail, category: 1 }
    ], {
      transaction
    })

    return {
      status: true,
      products: response
    }
  } catch (error) {
    return {
      status: false,
      message: constants.GENERAL_FUNCTIONS.FORMAT_ERROR(error)
    }
  }
}

const setup = async (connection) => {
  const transaction = await connection.transaction()

  try {
    const userResponse = await createUser(connection, transaction)
    if (!userResponse.status) throw new Error(userResponse.message)

    const productResponse = await createProducts(connection, transaction)
    if (!productResponse.status) throw new Error(productResponse.message)

    await transaction.commit()

    return 'Setup successful'
  } catch (error) {
    await transaction.rollback()

    throw error
  }
}

setup(connection)
  .then(response => {
    console.log(response)
    process.exit(0)
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })