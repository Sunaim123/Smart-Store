import axios from "axios"
import { apiUrl } from "../enumerations/constants"

export const createFeedback = async (token, payload) => {
  const { data: response } = await axios.post(`${apiUrl}/feedback`, payload, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const updateFeedback = async (token, payload) => {
  const { data: response } = await axios.put(`${apiUrl}/feedback`, payload, {
    headers: {
      "Token": token,
    }
  })
  return response
}

export const deleteFeedback = async (token, id) => {
  const { data: response } = await axios.delete(`${apiUrl}/feedback/${id}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getFeedback = async (token, id) => {
  const { data: response } = await axios.get(`${apiUrl}/feedback?id=${id}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getFeedbacks = async (token, query) => {
  const { data: response } = await axios.get(`${apiUrl}/feedbacks?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}