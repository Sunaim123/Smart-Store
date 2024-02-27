import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as userSlice from "../store/user"
import * as userApis from "../utilities/apis/user"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    try {
      setLoading(true)
      e.preventDefault()
      
      const form = new FormData(e.target)
      const username = form.get("username")
      const password = form.get("password")

      if (!username) throw new Error("Username is required")
      if (!password) throw new Error("Password is required")

      const response = await userApis.login({ username, password })
      if (!response.status) throw new Error(response.message)
      
      dispatch(userSlice.login(response))
      navigate("/dashboard")
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
      <main className="container-fluid">
        <div id="login" className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="card text-dark" style={{backgroundColor:"#ff3636b3", marginBottom:20, borderRadius:20}}>
              <div className="card-body">
                <h3 className="text-center">Login</h3>
                <br />
                <form method="POST" onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input type="text" name="username" className="form-control" placeholder="Username" required minLength="3" maxLength="50" />
                    <label>Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="password" name="password" className="form-control" placeholder="Password" required maxLength="32" />
                    <label>Password</label>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary py-3" disabled={loading}>Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </main>
  )
}

export default Login

