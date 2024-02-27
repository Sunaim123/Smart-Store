import axios from "axios"
import { serviceUrl } from "../enumerations/constants"

export const getCustomerCountValue = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/customer?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getZoneCountValue = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/zone?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getCustomerZoneCount = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/customer/zone?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getOrderCountValue = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/order?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getMostSellingProducts = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/order/product?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getProducts = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/products?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getProductBy = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/product/by?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getSummary = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/summary?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getOrders = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/orders?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getRatio = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/ratio?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getOrdersByZone = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/orders/zone?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getOrdersByDriver = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/orders/driver?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getOrdersByActiveDrivers = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/orders/active?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getEarningsByRider = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/rider?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}

export const getIncomeStatement = async (token, query) => {
  const { data: response } = await axios.get(`${serviceUrl}/report/income_statement?${query}`, {
    headers: {
      "Token": token
    }
  })
  return response
}