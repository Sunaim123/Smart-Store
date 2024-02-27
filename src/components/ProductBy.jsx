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
import * as constants from "../utilities/enumerations/constants"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const chartOptions = {
  responsive: true,
}

const by = {
  Dy: "Day",
  Mon: "Month",
  YYYY: "Year"
}

const order = {
  Dy: "ID",
  Mon: "MM",
  YYYY: "YYYY"
}

const ProductBy = () => {
  const navigate = useNavigate()
  const { token, user } = useSelector(state => state.user)
  const [products, setProducts] = useState([])
  const [orderBy, setOrderBy] = useState("count")
  const [report, setReport] = useState("Mon")
  const [options, setOptions] = useState(constants.months)
  const [option, setOption] = useState(constants.months[0].slug)

  const getProductBy = async (params) => {
    try {
      const query = new URLSearchParams(params)
      const response = await reportService.getProductBy(token, query.toString())
      if (!response.status) throw new Error(response.message)

      setProducts(response.products)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (!user) navigate("/login")

    getProductBy({
      by: report,
      value: option
    })
  }, [])

  useEffect(() => {
    getProductBy({
      by: report,
      value: option
    })
  }, [option])

  useEffect(() => {
    if (report === "Dy") {
      setOptions(() => constants.days)
      setOption(() => constants.days[0].slug)
    }
    if (report === "Mon") {
      setOptions(() => constants.months)
      setOption(() => constants.months[0].slug)
    }
    if (report === "YYYY") {
      setOptions(() => constants.years.map(year => ({ value: year, name: year, slug: year })))
      setOption(() => constants.years[0])
    }

    getProductBy({
      by: report,
      value: option
    })
  }, [report])

  useEffect(() => {
    setProducts(previous => {
      const products = previous.sort((a, b) => b[orderBy] - a[orderBy])
      return [...products]
    })
  }, [orderBy])

  const data = {
    labels: products.map(x => x.title),
    datasets: [{
      label: "Products",
      data: products.map(x => x[orderBy]),
      backgroundColor: "#ff3636cc",
    }]
  }
  return (
    <div className="card mb-4">
      <div className="card-header bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <div className="flex-grow-1 fw-bold">Products by <span className="text-capitalize">{by[report]}</span></div>
          <div className="d-flex justify-content-between align-items-center">
            <select className="form-select form-select-sm" onChange={(e) => setOption(e.target.value)}>
              {report === "Mon" && options.map((o) => (
                <option key={o.slug} value={o.slug}>{o.name}</option>
              ))}
              {report === "Dy" && options.map((o) => (
                <option key={o.slug} value={o.slug}>{o.name}</option>
              ))}
              {report === "YYYY" && options.map((o) => (
                  <option key={o.slug} value={o.slug}>{o.name}</option>
                ))}
            </select>
            <div className="btn-group btn-group-sm ms-2" role="group" aria-label="Basic example">
              <button type="button" className={"btn btn-light " + (report === "Dy" ? "active" : "")} onClick={() => setReport("Dy")}>Day</button>
              <button type="button" className={"btn btn-light " + (report === "Mon" ? "active" : "")} onClick={() => setReport("Mon")}>Month</button>
              <button type="button" className={"btn btn-light " + (report === "YYYY" ? "active" : "")} onClick={() => setReport("YYYY")}>Year</button>
            </div>
            <div className="btn-group btn-group-sm ms-2" role="group" aria-label="Basic example">
              <button type="button" className={"btn btn-light " + (orderBy === "count" ? "active" : "")} onClick={() => setOrderBy("count")}>Count</button>
              <button type="button" className={"btn btn-light " + (orderBy === "value" ? "active" : "")} onClick={() => setOrderBy("value")}>Value</button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        {products.length > 0 && <Bar options={chartOptions} data={data} height={75} />}
      </div>
    </div>
  )
}

export default ProductBy