import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar, Nav, Container, Badge } from 'react-bootstrap'
import { IoIosLogIn, IoMdBarcode } from "react-icons/io"
import '../assets/css/navbar.css'

function Header() {
  const cart = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)

    return (
        <>
            <Navbar expand="lg" className='py-lg-5 py-4'>
                <Container fluid="lg">
                        <Link to="/">
                            <img className='w-25' src='/shopsmart.png' />
                        </Link>
                    <div className='d-flex align-items-center nav-main-menu'>
                        <Navbar.Collapse id="navbar-nav">
                            <Nav className="w-75 justify-content-center">
                                <Link to="/products" className='nav-link'>Products</Link>
                                <Link to="/about" className='nav-link'>About</Link>
                                <Link to="/privacy" className='nav-link'>Privacy Policy</Link>
                                <Link to="/contact" className='nav-link'>Contacts</Link>
                                <Link to="/faq" className='nav-link'>FAQ</Link>
                            </Nav>
                        </Navbar.Collapse>
                        {user? <Link to="/dashboard" className='navbar-link'><IoMdBarcode/>Dashboard</Link> : <Link to="/login" className='navbar-link'><IoIosLogIn />Login</Link>}
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default Header