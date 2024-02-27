import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as feedbackApis from "../utilities/apis/feedback"
import DashboardHeader from "../components/DashboardHeader.jsx"

const Feedback = () => {
    const navigate = useNavigate()
    const { user, token } = useSelector(state => state.user)
    const nameRef = useRef(null)
    const statusRef = useRef(null)
    const emailRef = useRef(null)
    const problemRef = useRef(null)
    const resultRef = useRef(null)
    const order_idRef = useRef(null)
    const params = new URLSearchParams(window.location.search)


    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const name = e.target.name.value
            const email = e.target.email.value
            const problem = e.target.problem.value
            const status = e.target.status.value
            const order_id = e.target.order_id.value
            const result = e.target.result.value

            const payload = { name, email, problem, status, order_id, result }

            if (!params.has("id")) {

                const response = await feedbackApis.createFeedback(token, payload)
                if (!response.status) throw new Error(response.message)

                nameRef.current.value = ""
                emailRef.current.value = ""
                problemRef.current.value = ""
                statusRef.current.value = ""
                resultRef.current.value = ""
                order_idRef.current.value = ""
            } else {
                const updatePayload = { ...payload, id: parseInt(params.get("id")) }

                const response = await feedbackApis.updateFeedback(token, updatePayload)
                if (!response.status) throw new Error(response.message)
            }
            alert("Feedback Saved")
            navigate("/feedbacks")
        } catch (error) {
            alert(error.message)
        }
    }

    const getFeedback = async () => {
        try {
            const response = await feedbackApis.getFeedback(token, params.get("id"))
            if (!response.status) throw new Error(response.message)

            nameRef.current.value = response.feedback.name
            emailRef.current.value = response.feedback.email
            problemRef.current.value = response.feedback.problem
            statusRef.current.value = response.feedback.status
            order_idRef.current.value = response.feedback.order_id
            resultRef.current.value = response.feedback.result

        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        if (!user) navigate("/login")

        if (params.has("id"))
            getFeedback()
    }, [])

    return (
        <>
            <DashboardHeader />
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '25px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: "#ff3636b3", marginBottom: 20 }}>
                <h1>Feedback</h1>
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', marginBottom: '16px' }}>
                        <div style={{ marginRight: '16px', flex: 1 }}>
                            <label htmlFor="name" style={{ marginBottom: '8px' }}>Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                ref={nameRef}
                                required
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="status" style={{ marginBottom: '8px' }}>Status:</label>
                            <input
                                type="text"
                                id="status"
                                name="status"
                                ref={statusRef}
                                required
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '16px' }}>
                        <div style={{ marginRight: '16px', flex: 1 }}>
                            <label htmlFor="email" style={{ marginBottom: '8px' }}>Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                ref={emailRef}
                                required
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="order_id" style={{ marginBottom: '8px' }}>Order #</label>
                            <input
                                type="text"
                                id="order_id"
                                name="order_id"
                                ref={order_idRef}
                                required
                                style={{ padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    </div>

                    <label htmlFor="problem" style={{ marginBottom: '8px' }}>Problem:</label>
                    <textarea
                        id="problem"
                        name="problem"
                        rows="4"
                        ref={problemRef}
                        required
                        style={{ padding: '8px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
                    ></textarea>

                    <label htmlFor="result" style={{ marginBottom: '8px' }}>Result:</label>
                    <textarea
                        id="result"
                        name="result"
                        rows="4"
                        ref={resultRef}
                        style={{ padding: '8px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
                    ></textarea>

                    <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Submit Feedback</button>
                </form>
            </div>
        </>
    )
}

export default Feedback
