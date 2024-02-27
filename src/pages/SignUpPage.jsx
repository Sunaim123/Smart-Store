import React from "react"
import SignUpForm from "../components/SignupForm"
import { Link } from "react-router-dom"
import Header from "../components/Navbar.jsx"

function SignUpPage() {
    return (
         <>
         <Header/>
         <div className="container py-4">
            <h3 class="head-h3 fw-bold gradient-color mb-md-2 mb-4 text-center w-100">Create an Account</h3>
            <p className="text-center">Already have an account? <Link to="/login">Login</Link></p>
            <p className="text-center">Join us to get access to exclusive deals and offers!</p>
            <SignUpForm/>
        </div>
        </>
    )
}

export default SignUpPage