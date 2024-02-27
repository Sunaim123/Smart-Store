import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as returnApis from "../utilities/apis/return"
import DashboardHeader from "../components/DashboardHeader.jsx"

const Return = () => {
  const navigate = useNavigate()
  const { user, token } = useSelector((state) => state.user)
  const order_idRef = useRef(null)
  const returnReasonRef = useRef(null)
  const image1Ref = useRef(null)
  const image2Ref = useRef(null)


  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const form = new FormData()
      form.append("order_id", order_idRef.current.value)
      form.append("return_reason", returnReasonRef.current.value)
      form.append("image1", image1Ref.current.files[0])
      form.append("image2", image2Ref.current.files[0])

      const response = await returnApis.createReturn(token, form)
      if (!response.status) throw new Error(response.message)

      alert("Return Request Submitted")
      navigate("/returns")
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (!user) navigate("/login")
  }, [])

  return (
    <>
    <DashboardHeader/>
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "25px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ff3636b3",
        marginBottom: 20,
      }}
    >
      <h1>Return Request</h1>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
        >
        <div style={{ display: "flex", marginBottom: "16px" }}>
          <div style={{ marginRight: "16px", flex: 1 }}>
            <label htmlFor="order_id" style={{ marginBottom: "8px" }}>
              Order #:
            </label>
            <input
              type="text"
              id="order_id"
              name="order_id"
              ref={order_idRef}
              required
              style={{
                padding: "8px",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="return_reason" style={{ marginBottom: "8px" }}>
              Return Reason:
            </label>
            <input
              type="text"
              id="return_reason"
              name="return_reason"
              ref={returnReasonRef}
              required
              style={{
                padding: "8px",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="image1" style={{ marginBottom: "8px" }}>
            Image 1:
          </label>
          <input
            type="file"
            id="image1"
            name="image1"
            accept="image/*"
            ref={image1Ref}
            required
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="image2" style={{ marginBottom: "8px" }}>
            Image 2:
          </label>
          <input
            type="file"
            id="image2"
            name="image2"
            accept="image/*"
            ref={image2Ref}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Submit Return Request
        </button>
      </form>
    </div>
    </>
  )
}

export default Return
