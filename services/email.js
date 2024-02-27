const nodemailer = require('nodemailer')
const constants = require('../utilities/constants')

const getTransportOptions = (service) => {
  switch (service) {
    case 'gmail':
      return {
        host: constants.GOOGLE_HOST,
        port: parseInt(constants.GOOGLE_PORT),
        secure: constants.GOOGLE_SECURE,
        auth: {
          user: constants.GOOGLE_USERNAME,
          pass: constants.GOOGLE_PASSWORD
        }
      }
    case 'outlook':
    case 'hotmail':
      return {
        host: constants.MICROSOFT_HOST,
        port: parseInt(constants.MICROSOFT_PORT),
        secureConnection: constants.MICROSOFT_SECURE,
        auth: {
          user: constants.MICROSOFT_USERNAME,
          pass: constants.MICROSOFT_PASSWORD
        },
        tls: {
          ciphers: 'SSLv3'
        }
      }
    default:
      return {
        host: constants.EMAIL_HOST,
        port: parseInt(constants.EMAIL_PORT),
        secure: constants.EMAIL_SECURE,
        auth: {
          user: constants.EMAIL_USERNAME,
          pass: constants.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      }
  }
}

const mail = async (payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['service', 'name', 'username', 'to', 'subject', 'content'], payload)
    if (message.length) throw new Error(`${message.join(', ')} missing from the request`)

    const transportOptions = getTransportOptions(payload.service)
    const transporter = nodemailer.createTransport(transportOptions)
    if (!transporter) throw new Error('no service found')

    const mailOptions = {
      from: `${payload.name} <${payload.from || payload.username}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.content
    }

    if (payload.attachments && payload.attachments.length)
      mailOptions.attachments = payload.attachments

    const info = await transporter.sendMail(mailOptions)

    if (info.messageId) {
      return {
        status: true,
        message: info
      }
    }
  } catch (error) {
    return {
      status: false,
      message: error.message
    }
  }
}

const receive = async (payload) => {
  try {
    const message = constants.GENERAL_FUNCTIONS.FORMAT_REQUIRED_FIELDS(['service', 'name', 'username', 'from', 'subject', 'content'], payload)
    if (message.length) throw new Error(`${message.join(', ')} missing from the request`)

    const transportOptions = getTransportOptions(payload.service)
    const transporter = nodemailer.createTransport(transportOptions)
    if (!transporter) throw new Error('no service found')

    const mailOptions = {
      from: `${payload.name} <${payload.from}>`,
      to: 'info@brandswood.com',
      subject: payload.subject,
      html: payload.content
    }

    if (payload.attachments && payload.attachments.length)
      mailOptions.attachments = payload.attachments

    const info = await transporter.sendMail(mailOptions)

    if (info.messageId) {
      return {
        status: true,
        message: info
      }
    }
  } catch (error) {
    return {
      status: false,
      message: error.message
    }
  }
}

module.exports = { mail, receive }