import { useEffect, useRef, useState } from "react"
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
  scales: {
    xAxes: [{
      ticks: {
        steps: 10,
      }
    }],
  },
}

const by = {
  DD: "Date",
  Dy: "Day",
  Mon: "Month",
  YYYY: "Year",
}

const order = {
  DD: "DD",
  Dy: "ID",
  Mon: "MM",
  YYYY: "YYYY"
}

const OrderCountValue = () => {
  const navigate = useNavigate()
  const { token, user } = useSelector(state => state.user)
  const monthRef = useRef()
  const yearRef = useRef()
  const [orders, setOrders] = useState([])
  const [ordersBy, setOrdersBy] = useState("Mon")
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("Jan")
  const [report, setReport] = useState("count")


  const getOrders = async (params) => {
    try {
      const query = new URLSearchParams(params)

      const response = await reportService.getOrderCountValue(token, query.toString())
      if (!response.status) throw new Error(response.message)
      
      setOrders(response.orders)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleOrdersBy = (orderBy) => {
    setMonth(orderBy !== "Mon")
    setOrdersBy(orderBy)
  }

  const handleMonth = (e) => {
    setMonth(e.target.value)
    const params = {
      by: ordersBy,
      order: order[ordersBy],
      month: e.target.value,
      year,
    }
    getOrders(params)
  }

  useEffect(() => {
    if (!user) navigate("/login")

    getOrders({
      by: ordersBy,
      order: order[ordersBy],
    })
  }, [])

  useEffect(() => {
    const params = {
      by: ordersBy,
      order: order[ordersBy]
    }
    if (monthRef.current) params.month = monthRef.current.value
    if (yearRef.current) params.year = yearRef.current.value
    getOrders(params)
  }, [ordersBy, month, year])

  const data = {
    labels: orders.map(x => x.by),
    datasets: [{
      label: "Orders",
      data: orders.map(x => parseFloat(x[report])),
      backgroundColor: "#ff3636cc",
    }]
  }

  return (
    <div className="card mb-4">
      <div className="card-header bg-white">
        <div className="row align-items-center">
          <div className="col-md-6 fw-bold">Order <span className="text-capitalize">{report}</span> by <span className="text-capitalize">{by[ordersBy]}</span></div>
          <div className="col-md-6 d-flex gap-2 justify-content-end">
            {ordersBy === "DD" && (
                <select ref={monthRef} className="form-select form-select-sm w-25" onChange={handleMonth}>
                  <option value="">All</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                )}
                {ordersBy === "Mon" && (
                <select ref={yearRef} className="form-select form-select-sm w-25" onChange={(e) => setYear(e.target.value)}>
                  <option value="">All</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                  <option>2020</option>
                </select>
              )}
            <div className="btn-group btn-group-sm" role="group">
              <button type="button" className={"btn btn-light " + (ordersBy === "DD" ? "active" : "")} onClick={() => handleOrdersBy("DD")}>Date</button>
              <button type="button" className={"btn btn-light " + (ordersBy === "Dy" ? "active" : "")} onClick={() => handleOrdersBy("Dy")}>Day</button>
              <button type="button" className={"btn btn-light " + (ordersBy === "Mon" ? "active" : "")} onClick={() => handleOrdersBy("Mon")}>Month</button>
              <button type="button" className={"btn btn-light " + (ordersBy === "YYYY" ? "active" : "")} onClick={() => handleOrdersBy("YYYY")}>Year</button>
            </div>
            <div className="btn-group btn-group-sm" role="group">
              <button type="button" className={"btn btn-light " + (report === "value" ? "active" : "")} onClick={() => setReport("value")}>Value</button>
              <button type="button" className={"btn btn-light " + (report === "count" ? "active" : "")} onClick={() => setReport("count")}>Count</button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        {orders.length > 0 && <Bar options={options} data={data} height={75} />}
      </div>
    </div>
  )
}

export default OrderCountValue
