import axios from "axios"
import { apiUrl } from "../enumerations/constants"

export const createReturn = async (token, payload) => {
  const { data: response } = await axios.post(`${apiUrl}/return`, payload, {
    headers: {
      "Token": token,
      "Content-Type": "multipart/form-data"
    }
  })
  return response
}

export const getReturns = async (token, query) => {
  const { data: response } = await axios.get(`${apiUrl}/returns?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const deleteReturn = async (token, id) => {
  const {data: response } = await axios.delete(`${apiUrl}/return/${id}`, {
    headers: {
      "Token": token
    }
  })
  return response
}