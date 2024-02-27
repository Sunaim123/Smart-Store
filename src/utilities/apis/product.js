import axios from "axios"
import { apiUrl } from "../enumerations/constants"

export const createProduct = async (token, payload) => {
  const { data: response } = await axios.post(`${apiUrl}/product`, payload, {
    headers: {
      "Token": token,
      "Content-Type": "multipart/form-data"
    }
  })
  return response
}

export const updateProduct = async (token, payload) => {
  const { data: response } = await axios.put(`${apiUrl}/product`, payload, {
    headers: {
      "Token": token,
      "Content-Type": "multipart/form-data",
    }
  })
  return response
}

export const deleteProduct = async (token, id) => {
  const { data: response } = await axios.delete(`${apiUrl}/product/${id}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getProducts = async (token, query) => {
    const { data: response } = await axios.get(`${apiUrl}/products?${query}`, {
      headers: {
        "Token": token
      }
    })
    return response
  }

export const getProduct = async (token, id) => {
  const { data: response } = await axios.get(`${apiUrl}/product?id=${id}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const recommendProducts = async (token, id) => {
  const { data: response } = await axios.get(`${apiUrl}/recommended_product?id=${id}`, {
    headers: {
      "Token": token
    }
  })
  return response
}
  