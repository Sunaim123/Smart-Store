import axios from "axios"
import { apiUrl } from "../enumerations/constants"

export const login = async (payload) => {
  const { data: response } = await axios.post(`${apiUrl}/user/login`, payload)
  return response
}

export const createUser = async (token, payload) => {
  const { data: response } = await axios.post(`${apiUrl}/user`, payload)
  return response
}

export const logout = async (payload) => {
  const { data: response } = await axios.post(`${apiUrl}/user/logout`, payload)
  return response
}

export const getUser = async (token, id) => {
  const { data: response } = await axios.get(`${apiUrl}/user?id=${id}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getUsers = async (token, query) => {
  const { data: response } = await axios.get(`${apiUrl}/users?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const updateUser = async (token, payload) => {
  const { data: response } = await axios.put(`${apiUrl}/user`, payload, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const deleteUser = async (token, id) => {
  const { data: response } = await axios.delete(`${apiUrl}/user/${id}`, {
    headers: {
      "Token": token
    }
  })
  return response
}