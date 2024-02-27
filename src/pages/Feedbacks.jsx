import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getFeedbacks } from "../utilities/apis/feedback"
import * as feedbackApis from '../utilities/apis/feedback'
import DashboardHeader from "../components/DashboardHeader"

const Feedbacks = () => {
  const navigate = useNavigate()
  const { token, user, permissions } = useSelector(state => state.user)
  const [feedbacks, setFeedbacks] = useState([])

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete?")) return

      const response = await feedbackApis.deleteFeedback(token, id)
      if (!response.status) throw new Error(response.message)

      setFeedbacks((previous) => {
        const feedbacks = previous.filter(x => x.id !== id)
        return [...feedbacks]
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const handleEdit = async (id) => {
    navigate(`/feedback?id=${id}`)
  }

  useEffect(() => {
    if (!user) navigate("/login")

    getFeedback()
  }, [])

  const getFeedback = async () => {
    try {
      const response = await getFeedbacks(token, "")
      if(!response.status) throw new Error ("Feedbacks not found")

      if (user.role_id === 2) {
        const userFeedbacks = response.feedbacks.filter(feedbackItem => feedbackItem.user_id === user.id)
        setFeedbacks(userFeedbacks)
      } else {
        setFeedbacks(response.feedbacks)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
    <DashboardHeader />
    <main id="products" className="my-2" style={{ minHeight: "100vh" }}>
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="fw-bold m-0 gradient-color">Feedbacks</h1>
        {user?.role_id === 2 && (<button className="btn btn-primary" onClick={()=>navigate("/feedback")}>New</button>)}
      </div>
    </div>

    <table className="table table-hover shadow-none table-striped" style={{border:2}}>
      <thead style={{backgroundColor:"#ff3636b3"}}>
        <tr>
          <th scope="col" style={{ width: "10%" }} className="align-middle text-center">ID</th>
          <th scope="col" style={{ width: "10%" }} className="align-middle">Name</th>
          <th scope="col" style={{ width: "15%" }} className="align-middle text-center">Email</th>
          <th scope="col" style={{ width: "20%" }} className="align-middle text-center">Problem</th>
          <th scope="col" style={{ width: "18%" }} className="align-middle text-center">Result</th>
          <th scope="col" style={{ width: "10%" }} className="align-middle text-center">Status</th>
          <th scope="col" style={{ width: "10%" }} className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.map((row, index) => (
          <tr key={row.id.toString()}>
            <td className="align-middle text-center">#F.{(index + 1)}</td>
            <td className="align-middle">{row.name}</td>
            <td className="align-middle text-center">{row.email}</td>
            <td className="align-middle text-center">{row.problem}</td>
            <td className="align-middle text-center">{row.result}</td>
            <td className="align-middle text-center">{row.status}</td>
            <td className="align-middle text-center">
              <a className="me-2" onClick={() => handleEdit(row.id)}><i className="far fa-edit"></i></a>
              <a className="text-danger" onClick={() => handleDelete(row.id)}><i className="far fa-trash-alt"></i></a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </main>
  </>
  )
        }

export default Feedbacks
