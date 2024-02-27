require('dotenv').config()
const bcrypt = require('bcrypt')

module.exports = {
  DATABASE: process.env.DATABASE_NAME,
  USERNAME: process.env.DATABASE_USERNAME,
  PASSWORD: process.env.DATABASE_PASSWORD,
  ENUMERATIONS: {
    ADVERTISEMENT: 3000,
    LABOR: 500,
    PACKING: 300,
    COMMISSION: 280,
    BEARER_TOKEN: process.env.BEARER_TOKEN,
  },
  GENERAL_FUNCTIONS: {
    GET_TOKEN: () => {
      const token = []
      const possibilities = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 64; i++)
        token[i] = possibilities.charAt(Math.floor(Math.random() * possibilities.length))

      return token.join('')
    },
    TO_ARRAY: (string) => string.split(','),
    ENCRYPT_PASSWORD: async (password) => await bcrypt.hash(password, 10),
    COMPARE_PASSWORD: async (password, hash) => await bcrypt.compare(password, hash),
    FORMAT_REQUIRED_FIELDS: (requiredFields, payload) => {
      const message = []

      for (let field in requiredFields)
        if (!payload[requiredFields[field]])
          message.push(requiredFields[field])

      return message
    },
    FORMAT_BULK_REQUIRED_FIELDS: (requiredFields, payload) => {
      const message = []

      for (let i = 0; i < payload.length; i++)
        for (let field in requiredFields)
          if (!payload[i][requiredFields[field]])
            message.push(requiredFields[field])

      return [...new Set(message)]
    },
    FORMAT_ERROR: (error) => {
      let message = error.message

      if (error.errors && error.errors.length > 0) {
        let errors = []

        for (let i = 0; i < error.errors.length; i++)
          errors.push(error.errors[i].message)

        message = errors.join(', ')
      }

      if (message.indexOf('foreign key') > -1) message = 'cannot delete due to foreign key constraint error'
      if (message === 'date must be unique') message = 'expenses already been generated'

      return message
    }
  },
}