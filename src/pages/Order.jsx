import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as orderApis from "../utilities/apis/order"
import moment from 'moment'
import DashboardHeader from "../components/DashboardHeader.jsx"

const Order = () => {
    const navigate = useNavigate()
    const { user, token } = useSelector(state => state.user)
    const params = new URLSearchParams(window.location.search)
    const [order, setOrder] = useState(null)

    const handlePay = async () => {
        try {
            const response = await orderApis.payOrder(token, params.get("id"))
            if (!response.status) throw new Error(response.message)

            setOrder({
                ...order,
                payment_status: "paid"
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const getOrder = async () => {
        try {
            const response = await orderApis.getOrder(token, params.get("id"))
            if (!response.status) throw new Error(response.message)

            setOrder(response.order)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        if (!user) navigate("/")

        if (params.has("id"))
            getOrder()
    }, [])

    return (
        <>
            <DashboardHeader />
            <div id="order" className="my-4 container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold m-0">Order #: <span className="text-danger fw-bold">P{order?.id}</span></h3>
                </div>

                <div className="row">
                    <div className="col-md-9">
                        <div className="card mb-4" style={{ backgroundColor: "#ff3636ab" }}>
                            <div className="card-body">
                                <table className="table shadow-none">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="fw-bold">Product</th>
                                            <th scope="col" className="text-center fw-bold">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.order_lineitems.map((item) => (
                                            <tr key={item.id.toString()}>
                                                <td className="align-middle small">
                                                    <p className="m-0">{item.product.title}</p>
                                                </td>
                                                <td className="align-middle text-center">Rs. {item.price.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="card mb-4" style={{ backgroundColor: "#ff3636ab" }}>
                            <div className="card-header">
                                <p className="m-0 text-dark fw-bold lead">Customer</p>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="m-0 text-dark fw-bold">Name</p>
                                    <p className="m-0">{user?.name}</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="m-0 text-dark fw-bold">Mobile</p>
                                    <p className="m-0">{order?.mobile}</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="m-0 text-dark fw-bold">Address</p>
                                    <p className="m-0">{order?.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card mb-4" style={{ backgroundColor: "#ff3636ab" }}>
                            <div className="card-header">
                                <p className="m-0 text-dark fw-bold lead">Order Summary</p>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="m-0 text-dark fw-bold">Order Date</p>
                                    <p className="m-0">{moment(order?.order_datetime).format("DD-MM-YYYY")}</p>
                                </div>
                            </div>
                            <div className="card-footer border-top-0 d-flex justify-content-between align-items-center">
                                <p className="m-0 text-white fw-bold lead">Total</p>
                                <p className="m-0 text-white fw-bold lead">Rs. {order?.total}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Order
