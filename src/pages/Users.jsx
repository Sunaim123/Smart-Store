import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import * as userApis from "../utilities/apis/user"
import DashboardHeader from "../components/DashboardHeader.jsx"

const Users = () => {
    const navigate = useNavigate()
    const { user, token } = useSelector(state => state.user)
    const [users, setUsers] = useState([])
    const mobileRef = useRef(null)

    const handleNew = () => {
        navigate("/profile")
    }

    const handleSearch = () => {
        const where = {}
        if (mobileRef.current.value) where.mobile = mobileRef.current.value

        const query = new URLSearchParams(where)
        getUsers(query)
    }

    const handleEdit = (id) => {
        navigate(`/profile?id=${id}`)
    }

    const getUsers = async (query = "") => {
        try {
            const response = await userApis.getUsers(token, query.toString())
            if (!response.status) throw new Error(response.message)

            if (user.role_id === 2) {
                const filterUser = response.users.filter(userItem => userItem.id === user.id)
                setUsers(filterUser)
            } else {
                setUsers(response.users)
            }

        } catch (error) {
        }
    }

    useEffect(() => {
        if (!user) navigate("/")

        getUsers()
    }, [])

    return (
        <>
            <DashboardHeader />
            <main id="drivers" className="my-2" style={{ minHeight: "100vh" }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h3 className="col-9 fw-bold gradient-color m-0">Users</h3>
                        <input ref={mobileRef} type="text" className="col-2 form-control-sm ms-2 mb-2" placeholder="Search by name" /> &nbsp <FaSearch className="mb-2" onClick={handleSearch} />
                        {user?.role_id === 1 && (<button className="btn btn-primary" onClick={() => handleNew()}>New</button>)}
                    </div>
                </div>

                <table className="table table-bordered table-hover table-striped shadow-none">
                    <thead style={{ backgroundColor: "#ff3636b3" }}>
                        <tr>
                            <th scope="col" style={{ width: "10%" }} className="text-center">ID</th>
                            <th scope="col" style={{ width: "40%" }}>Name</th>
                            <th scope="col" style={{ width: "20%" }}>Mobile</th>
                            <th scope="col" style={{ width: "10%" }} className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((row) => (
                            <tr key={row.id.toString()}>
                                <td className="align-middle text-center">{row.id}</td>
                                <td className="align-middle">{row.name}</td>
                                <td className="align-middle">{row.mobile}</td>
                                <td className="align-middle text-center">
                                    <a className="me-2" onClick={() => handleEdit(row.id)}><i className="far fa-edit"></i></a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    )
}

export default Users
