import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as userApis from "../utilities/apis/user"
import DashboardHeader from "../components/DashboardHeader.jsx"

const Profile = () => {
    const navigate = useNavigate()
    const { user, token } = useSelector(state => state.user)
    const [points, setPoints] = useState([])
    const [userId, setUserId] = useState([])
    const nameRef = useRef(null)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const mobileRef = useRef(null)
    const params = new URLSearchParams(window.location.search)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const name = e.target.name.value
            const username = e.target.username.value
            const password = e.target.password.value
            const mobile = e.target.mobile.value
            const payload = { name, username, password, mobile }

            if (!params.has("id")) {
                const response = await userApis.createUser(token, payload)
                if (!response.status) throw new Error(response.message)

                nameRef.current.value = ""
                usernameRef.current.value = ""
                passwordRef.current.value = ""
                mobileRef.current.value = ""
            } else {
                payload.id = parseInt(params.get("id"))
                const response = await userApis.updateUser(token, payload)
                if (!response.status) throw new Error(response.message)
            }


            alert("User saved")
            navigate("/dashboard")
        } catch (error) {
            alert(error.message)
        }
    }

    const getUser = async () => {
        try {
            const response = await userApis.getUser(token, params.get("id"))
            if (!response.status) throw new Error(response.message)

            nameRef.current.value = response.user.name
            usernameRef.current.value = response.user.username
            passwordRef.current.value = response.user.password
            mobileRef.current.value = response.user.mobile
            setUserId(response.user.id)
            setPoints(response.user.points)
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        if (!user) navigate("/")

        if (params.has("id"))
            getUser()
    }, [])

    return (
        <>
            <DashboardHeader />
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
                                            <input ref={mobileRef} type="text" className="form-control" id="mobile" placeholder="mobile" required />
                                            <label htmlFor="mobile">Mobile</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input ref={passwordRef} type="password" className="form-control" id="password" placeholder="Password" required />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        {userId !== user.id && (<div className="text-white">
                                            <label htmlFor="points">Redeemable Points: &nbsp;{points <= 0? 0 : points}</label>
                                        </div>)}
                                        &nbsp;
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

export default Profile
