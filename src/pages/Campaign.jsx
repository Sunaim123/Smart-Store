import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as reportService from "../utilities/apis/report"
import DashboardHeader from "../components/DashboardHeader"

const TopSellingProducts = () => {
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.user)
  const [topProducts, setTopProducts] = useState([])

  const getTopSellingProducts = async () => {
    try {
      const response = await reportService.getMostSellingProducts(token)
      if (!response.status) throw new Error(response.message)
      setTopProducts(response.order)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (!user) navigate("/login")

    getTopSellingProducts()
  }, [user, token])

  return (
    <>
      <DashboardHeader />
      <div className="container">
        <h1 className="gradient-color"> Top Selling Products </h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product #</th>
              <th>Product Name</th>
              <th>Total Quantity Sold</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product) => (
              <tr key={product.product_id}>
                <td>P.{product.product_id}</td>
                <td>{product.title}</td>
                <td>{product.total_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TopSellingProducts
