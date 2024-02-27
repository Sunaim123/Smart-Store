import React from "react"
import LoginForm from "../components/LoginForm"
import { Link } from "react-router-dom"
import Header from "../components/Navbar"

function LoginPage() {
    return (
         <>
         <Header/>
         <div className="container py-4">
         <p className="text-center">Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
            <LoginForm/>
        </div>
        </>
    )
}

export default LoginPage