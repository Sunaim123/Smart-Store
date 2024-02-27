import { useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { Form, Button } from 'react-bootstrap'
import "../assets/css/Form.css"
import * as userApis from "../utilities/apis/user"

function SignUpForm() {
    const navigate = useNavigate()
    const nameRef = useRef(null)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)


    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const name = e.target.name.value
            const username = e.target.username.value
            const password = e.target.password.value
            const mobile = e.target.mobile.value
            const payload = { name, username, password, mobile }

            const response = await userApis.createUser(payload)
            if (!response.status) throw new Error(response.message)

            alert("Welcome !")
            navigate("/login")
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            <main id="driver" className="my-4">
                <div className="container">
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <div className="card" style={{ backgroundColor: "#ff3636b3" }}>
                                <div className="card-header border-bottom-0 text-center">
                                    <h3 className="fw-bold m-0">User</h3>
                                </div>
                                <div className="card-body">
                                    <form method="POST" onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input ref={nameRef} type="text" className="form-control" id="name" placeholder="Name" required />
                                            <label htmlFor="name">Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input ref={usernameRef} type="text" className="form-control" id="username" placeholder="Username" required />
                                            <label htmlFor="username">Username</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input ref={usernameRef} type="text" className="form-control" id="mobile" placeholder="mobile" required />
                                            <label htmlFor="mobile">Mobile</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input ref={passwordRef} type="password" className="form-control" id="password" placeholder="Password" required />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary py-3">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default SignUpForm
