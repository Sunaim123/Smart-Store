import axios from "axios"
import { apiUrl } from "../enumerations/constants"

export const createOrder = async (token, payload) => {
  const { data: response } = await axios.post(`${apiUrl}/order`, payload, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const updateOrder = async (token, payload) => {
  const { data: response } = await axios.put(`${apiUrl}/order`, payload, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const deleteOrder = async (token, id) => {
  const { data: response } = await axios.delete(`${apiUrl}/order/${id}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const trashOrder = async (token, id) => {
  const { data: response } = await axios.patch(`${apiUrl}/order/trash`, { id }, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getOrders = async (token, query) => {
  const { data: response } = await axios.get(`${apiUrl}/orders?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getOrder = async (token, id) => {
  const { data: response } = await axios.get(`${apiUrl}/order?id=${id}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const payOrder = async (token, id) => {
  const { data: response } = await axios.patch(`${apiUrl}/order/pay`, { id }, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const recoverOrder = async (token, id) => {
  const { data: response } = await axios.patch(`${apiUrl}/order/recover`, { id }, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const checkout = async (token, payload) => {
  const { data: response } = await axios.post(`${apiUrl}/order/checkout`, payload)
  return response
}