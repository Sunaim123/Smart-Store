import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap'
import { FaBars, FaTimes, FaRegUser, FaUserCog, FaProductHunt, FaShoppingBag, FaChartBar, FaComments, FaUndo, FaClipboardList, FaSignOutAlt, FaShoppingCart, FaChartArea } from 'react-icons/fa'
import '../assets/css/navbar.css'
import * as userSlice from "../store/user"
import { emptyCart } from '../store/cart'
import * as userApis from "../utilities/apis/user"

function DashboardHeader() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  const { token, user } = useSelector(state => state.user)


  const handleLogout = async () => {
    try {
      if (!window.confirm("Are you sure you want to logout?")) return

      const response = await userApis.logout({ token })
      if (!response.status) throw new Error(response.message)

      dispatch(emptyCart())
      dispatch(userSlice.logout())
      navigate("/login")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <Navbar expand="lg" className='py-lg-5 py-4'>
        <Container fluid="lg">
          <Link to="/">
            <img style={{ marginLeft: -70, width: 150 }} src='/shopsmart.png' />
          </Link>
          <div className='d-flex align-items-center nav-main-menu'>
            <Navbar.Toggle aria-controls="navbar-nav">
              <FaBars className="open" />
              <FaTimes className="close" />
            </Navbar.Toggle>
            <Navbar.Collapse id="navbar-nav">
              <Nav className="w-100 justify-content-center">
                <Link to="/dashboard" className='nav-link'><FaChartBar /> Dashboard</Link>
                <Link to="/feedbacks" className='nav-link'><FaComments /> Feedbacks</Link>
                <Link to="/returns" className='nav-link'><FaUndo /> Returns</Link>
                <Link to="/orders" className='nav-link'><FaClipboardList /> Orders</Link>
                <Link to="/products" className='nav-link'><FaShoppingBag />Products</Link>
                {user?.role_id === 1 && (
                  <>
                    <Link to="/product_list" className='nav-link'><FaProductHunt />List of Products</Link>
                    <NavDropdown title={<span><FaChartArea /> Reports</span>} id="basic-nav-dropdown" >
                      <NavDropdown.Item as={Link} to="/report/product/by"> Product Report</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/report/order"> Order Report</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/campaign"> Campaign</NavDropdown.Item>
                    </NavDropdown>
                  </>)}
              </Nav>
            </Navbar.Collapse>
            <div style={{ display: "flex", alignItems: "center", marginRight: -60 }}>
              <NavDropdown title={<FaUserCog style={{ color: "red" }} />} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/users"><FaRegUser />Users</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}><FaSignOutAlt/>Logout</NavDropdown.Item>
              </NavDropdown>
              <span style={{ marginLeft: 10 }}>
                {user && <Link to="/cart" className="navbar-link">
                  <FaShoppingCart />
                  {cart.length > 0 &&
                    <Badge bg="danger">
                      {cart.length}</Badge>}
                </Link>}
              </span>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default DashboardHeader
