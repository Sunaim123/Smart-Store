import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import * as reportService from "../utilities/apis/report"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
}

const Products = () => {
  const navigate = useNavigate()
  const { token, user } = useSelector(state => state.user)
  const [products, setProducts] = useState([])
  const [orderBy, setOrderBy] = useState("count")

  const getProducts = async (params) => {
    try {
      const query = new URLSearchParams(params)
      const response = await reportService.getProducts(token, query.toString())
      if (!response.status) throw new Error(response.message)

      setProducts(response.products)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (!user) navigate("/login")

    getProducts({
      orderBy
    })
  }, [])

  useEffect(() => {
    setProducts(previous => {
      const products = previous.sort((a, b) => b[orderBy] - a[orderBy])
      return [...products]
    })
  }, [orderBy])

  const data = {
    labels: products.map(x => x.title),
    datasets: [{
      label: "Product",
      data: products.map(x => x[orderBy]),
      backgroundColor: "#ff3636cc",
    }]
  }

  return (
    <div className="card mb-4">
      <div className="card-header bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <div className="fw-bold">Product <span className="text-capitalize">{orderBy}</span></div>
          <div>
            <div className="btn-group btn-group-sm me-2" role="group" aria-label="Basic example">
              <button type="button" className={"btn btn-light " + (orderBy === "count" ? "active" : "")} onClick={() => setOrderBy("count")}>Count</button>
              <button type="button" className={"btn btn-light " + (orderBy === "value" ? "active" : "")} onClick={() => setOrderBy("value")}>Value</button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        {products.length > 0 && <Bar options={options} data={data} height={75} />}
      </div>
    </div>
  )
}

export default Products