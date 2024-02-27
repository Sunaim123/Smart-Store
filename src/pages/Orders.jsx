import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import moment from "moment"
import * as orderApis from "../utilities/apis/order"
import DashboardHeader from "../components/DashboardHeader"

const Orders = () => {
  const navigate = useNavigate()
  const unpaidRef = useRef(null)
  const paidRef = useRef(null)
  const mobileRef = useRef(null)
  const { token, user } = useSelector((state) => state.user)
  const [orders, setOrders] = useState([])
  const [selected, setSelected] = useState([])


  const handleSearch = () => {
    const where = {}

    if (unpaidRef.current.checked) where.payment_status = "unpaid"
    if (paidRef.current.checked) where.payment_status = "paid"
    if (user.role_id === 1 && mobileRef.current.value) where.mobile = mobileRef.current.value

    const query = new URLSearchParams(where)
    getOrders(query)
  }

  const handleView = (id) => {
    navigate(`/order?id=${id}`)
  }

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete?")) return

      const response = await orderApis.deleteOrder(token, id)
      if (!response.status) throw new Error(response.message)

      setOrders((previous) => {
        const updatedOrders = previous.filter((x) => x.id !== id)
        return [...updatedOrders]
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const getOrders = async (query = "") => {
    try {
      const response = await orderApis.getOrders(token, query.toString())
      if (!response.status) throw new Error("Orders not found")

      if (user.role_id === 2) {
        const userOrders = response.orders.filter(orderItem => orderItem.user_id === user.id)
        setOrders(userOrders)
      } else {
        setOrders(response.orders)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const handleChange = (id) => {
    if (!selected.includes(id))
      setSelected((previous) => {
        previous.push(id)
        return [...previous]
      })
    else
      setSelected((previous) => {
        return previous.filter(x => x !== id)
      })
  }

  const handlePay = async () => {
    try {
      if (!window.confirm("Are you sure you want to mark as paid?")) return

      const response = await orderApis.payOrder(token, selected.join(","))
      if (!response.status) throw new Error(response.message)

      setOrders((previous) => {
        const orders = previous.map(x => selected.includes(x.id) ? { ...x, payment_status: "paid" } : x)
        return [...orders]
      })
      setSelected([])
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (!user) navigate("/")

    getOrders()
  }, [])

  return (
    <>
      <DashboardHeader />
      <main id="orders" className="my-2" style={{ minHeight: "100vh" }}>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1 className="col-8 fw-bold m-0 gradient-color">Orders</h1>
            <div className="btn-group btn-group-sm ms-2" role="group">
              {user?.role_id === 1 && (<button type="button" className="btn btn-sm btn-success" onClick={handlePay}>Mark as Paid</button>)}
            </div>
            <input ref={unpaidRef} type="checkbox" className="btn-check" name="unpaid" id="unpaid" autoComplete="off" onChange={handleSearch} />
            <label className="btn btn-sm btn-light" htmlFor="unpaid" style={{ backgroundColor: unpaidRef.current && unpaidRef.current.checked ? '#ffffff' : '#ff3636b5' }}>Unpaid</label>
            <input ref={paidRef} type="checkbox" className="btn-check" name="paid" id="paid" autoComplete="off" onChange={handleSearch} />
            <label className="btn btn-sm btn-light" htmlFor="paid" style={{ backgroundColor: paidRef.current && paidRef.current.checked ? '#ffffff' : '#ff3636b5' }}>Paid</label>
            {user?.role_id === 1 && (<><input ref={mobileRef} type="text" className="form-control-sm ms-2" placeholder="Search by mobile" /> &nbsp; <FaSearch className="mt-2" onClick={handleSearch} /> </>)}
          </div>

        </div>

        <table className="table table-hover shadow-none table-striped" style={{ border: 2 }}>
          <thead style={{ backgroundColor: "#ff3636b3" }}>
            <tr>
              <th scope="col" style={{ width: "8%" }}>
                ID
              </th>
              <th scope="col" style={{ width: "20%" }} className="align-middle">
                Note
              </th>
              <th scope="col" style={{ width: "10%" }} className="align-middle">
                Order Status
              </th>
              <th scope="col" style={{ width: "10%" }} className="align-middle">
                Payment Status
              </th>
              <th scope="col" style={{ width: "20%" }} className="align-middle text-center">
                Order Datetime
              </th>
              <th scope="col" style={{ width: "8%" }} className="align-middle text-center">
                Total
              </th>
              <th scope="col" style={{ width: "12%" }} className="align-middle text-center">
                Mobile
              </th>
              <th scope="col" style={{ width: "24%" }} className="align-middle">
                Address
              </th>
              <th scope="col" style={{ width: "8%" }} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((row, index) => (
              <tr key={row.id.toString()}>
                <td>
                  &nbsp;
                  #O.{row.id}
                  &nbsp;
                  {user?.role_id === 1 && row.payment_status === "unpaid" && (<input className="form-check-input" type="checkbox" id={row.id} value={row.id} onChange={() => handleChange(row.id)} checked={selected.includes(row.id)} />)}
                </td>
                <td className="align-middle">{row.note}
                </td>
                <td className="align-middle">{row.order_status}</td>
                <td className="align-middle">{row.payment_status}</td>
                <td className="align-middle text-center">{moment(row.order_datetime).format("DD-MM-YYYY")}</td>
                <td className="align-middle text-center">Rs.{row.total}</td>
                <td className="align-middle text-center">{row.mobile}</td>
                <td className="align-middle">{row.address}</td>
                <td className="align-middle text-center">
                  <a className="me-2" onClick={() => handleView(row.id)}><i className="far fa-clipboard"></i></a>
                  <a className="text-danger" onClick={() => handleDelete(row.id)}>
                    <i className="far fa-trash-alt"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}

export default Orders
