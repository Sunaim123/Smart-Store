import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getReturns } from "../utilities/apis/return"
import { getOrders } from "../utilities/apis/order"
import { getProducts } from "../utilities/apis/product"
import { getFeedbacks } from "../utilities/apis/feedback"
import DashboardHeader from "../components/DashboardHeader"

const Dashboard = () => {
  const navigate = useNavigate()
  const { token, user, permissions } = useSelector((state) => state.user)
  const [returns, setReturns] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!user) navigate("/login")
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const returnsData = await getReturns(token, "")
      if (user.role_id === 2) {
        const userReturns = returnsData.returns.filter(returnItem => returnItem.user_id === user.id)
        setReturns(userReturns)
      } else {
        setReturns(returnsData.returns)
      }

      const feedbacksData = await getFeedbacks(token, "")
      if (user.role_id === 2) {
        const userFeedbacks = feedbacksData.feedbacks.filter(feedbackItem => feedbackItem.user_id === user.id)
        setFeedbacks(userFeedbacks)
      } else {
        setFeedbacks(feedbacksData.feedbacks)
      }

      const ordersData = await getOrders(token, "")
      if (user.role_id === 2) {
        const userOrders = ordersData.orders.filter(orderItem => orderItem.user_id === user.id)
        setOrders(userOrders)
      } else {
        setOrders(ordersData.orders)
      }

      if (user.role_id === 1) {
        const productsData = await getProducts(token, "")
        setProducts(productsData.products)
      }

    } catch (error) {
      alert(error.message)
    }
  }

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    minWidth: "300px",
    height: "200px",
    padding: "20px",
    margin: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  }

  return (
    <div className="dashboard-container" style={{ height: "100vh", overflowY: "auto" }}>
      <DashboardHeader />
      <div style={{ padding: "20px", display: "flex", flexWrap: "wrap" }}>
        <div style={cardStyle}>
          <h2>Returns</h2>
          <p>Total: {returns?.length}</p>
        </div>

        <div style={cardStyle}>
          <h2>Feedbacks</h2>
          <p>Total: {feedbacks?.length}</p>
        </div>

        <div style={cardStyle}>
          <h2>Orders</h2>
          <p>Total: {orders?.length}</p>
        </div>

        {user?.role_id === 1 && (
          <div style={cardStyle}>
            <h2>Products</h2>
            <p>Total: {products?.length}</p>
          </div>)}
      </div>
    </div>

  )
}

export default Dashboard
