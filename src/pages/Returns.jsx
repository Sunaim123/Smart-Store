import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as returnApis from "../utilities/apis/return"
import { url } from "../utilities/enumerations/constants"
import DashboardHeader from "../components/DashboardHeader"

const Returns = () => {
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.user)
  const [returns, setReturns] = useState([])

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete?")) return

      const response = await returnApis.deleteReturn(token, id)
      if (!response.status) throw new Error(response.message)

      setReturns((previous) => {
        const updatedReturns = previous.filter((x) => x.id !== id)
        return [...updatedReturns]
      })
    } catch (error) {
      alert(error.message)
    }
  }
  
  const getReturns = async () => {
    try {
      const response = await returnApis.getReturns(token, "")
      if(!response.status) throw new Error ("Returns not available")

      if (user.role_id === 2) {
        const userReturns = response.returns.filter(returnItem => returnItem.user_id === user.id)
        setReturns(userReturns)
      } else {
        setReturns(response.returns)
      }
  } catch (error) {
    console.error(error.message)
  }
}

useEffect(() => {
  if (!user) navigate("/login")

  getReturns()
}, [])

  return (
    <>
    <DashboardHeader/>
    <main id="returns" className="my-2" style={{ minHeight: "100vh" }}>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h1 className="fw-bold m-0 gradient-color">Returns</h1>
          <button className="btn btn-primary" onClick={() => navigate("/return")}>
            New
          </button>
        </div>
      </div>

      <table className="table table-hover shadow-none table-striped" style={{ border: 2 }}>
        <thead style={{ backgroundColor: "#ff3636b3" }}>
          <tr>
            <th scope="col" style={{ width: "10%" }} className="align-middle text-center">
              ID
            </th>
            <th scope="col" style={{ width: "20%" }} className="align-middle text-center">
              Order ID
            </th>
            <th scope="col" style={{ width: "40%" }} className="align-middle">
              Return Reason
            </th>
            <th scope="col" style={{ width: "20%" }} className="align-middle">
              Return Status
            </th>
            <th scope="col" style={{ width: "20%" }} className="align-middle text-center">
              Return Date
            </th>
            <th scope="col" style={{ width: "20%" }} className="align-middle text-center">
              Image 1
            </th>
            <th scope="col" style={{ width: "20%" }} className="align-middle text-center">
              Image 2
            </th>
            <th scope="col" style={{ width: "10%" }} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {returns.map((row, index) => (
            <tr key={row.id.toString()}>
              <td className="align-middle text-center">{index + 1}</td>
              <td className="align-middle text-center">{row.order_id}</td>
              <td className="align-middle">{row.return_reason}</td>
              <td className="align-middle">{row.return_status}</td>
              <td className="align-middle">{row.return_date}</td>
              <td className="align-middle text-center cursor-pointer">
                <img onClick={()=> window.open(row.image1?.replace("public", url))} src={row.image1?.replace("public", url)} style={{ maxWidth: "100px", maxHeight: "100px" }} />
              </td>
              <td className="align-middle text-center cursor-pointer">
                <img onClick={()=> window.open(row.image2?.replace("public", url))} src={row.image2?.replace("public", url)} style={{ maxWidth: "100px", maxHeight: "100px" }} />
              </td>
              <td className="align-middle text-center">
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

export default Returns
