import React, { useState, useEffect } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { removeFromCart } from '../store/cart'
import { url } from '../utilities/enumerations/constants'
import * as userApis from "../utilities/apis/user"
import DashboardHeader from "../components/DashboardHeader.jsx"

const cartSectionStyle = {
  overflowY: 'auto',
  maxHeight: '600px'
}

const orderSummaryStyle = {
  position: 'sticky',
  top: '20px'
}

function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart)
  const [usePoints, setUsePoints] = useState(false)
  const [totalPrice, setTotalPrice] = useState(cart.reduce((total, product) => total + product.price, 0))
  const [totalPoints, setTotalPoints] = useState(0)


  const handleCancel = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const handleCheckout = () => {
    window.location.href = "/checkout"
  }

  const handleUsePoints = () => {

    setTotalPrice (totalPoints ? totalPrice - totalPoints : totalPrice)
    setUsePoints(true)
  }

  const getUser = async () => {
    try {
      const userResponse = await userApis.getUser(token, user.id)
      if (!userResponse.status) throw new Error(userResponse.message)

      setTotalPoints(userResponse.user.points)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    if (!user) navigate("/login")
  
    getUser()
  }, [])

  return (
    <>
    <DashboardHeader />
    <Container fluid style={{marginBottom:40}}>
      <h2 className='head-h2 gradient-color fw-bold'>Shopping Cart</h2>
      <Row>
        <Col md={8} style={cartSectionStyle}>
          <div style={{ maxHeight: '400px'}}>
            <Row xs={1} md={2} lg={3}>
              {cart.map((element) => (
                <Col key={element.url} className='mb-4'>
                  <Card style={{ width: '80%', height: "100%", backgroundColor: '#ffeac6', border: 'solid', borderRadius: '18px' }}>
                    <Card.Img style={{ borderRadius: '10px', height: '150px', objectFit: 'cover' }} src={element.thumbnail?.replace('public', url)} />
                    <Card.Body>
                      <Card.Title>{element.title}</Card.Title>
                      <Card.Text variant='primary'>Rs. {element.price}</Card.Text>
                      <Button
                        onClick={() => handleCancel(element.id)}
                        style={{
                          bottom: '10px',
                          backgroundColor: '#ffd080',
                          borderColor: '#ffd080',
                          transform: 'translateX(0%)',
                        }}
                      >
                        Cancel
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col md={4} style={orderSummaryStyle}>
          <div style={{ position: 'sticky', top: '20px' }}>
            <Card style={{ backgroundColor: 'rgb(255 208 128)' }}>
              <Card.Body>
                <h5 className='mb-3'>Order Summary</h5>
                <ul className='list-unstyled mb-3'>
                  {cart.map((element) => (
                    <li key={element.id} className='mb-2'>
                      {element.title} - Rs. {element.price}
                    </li>
                  ))}
                </ul>
                <hr />
                <strong>Previous Points: {totalPoints<=0? 0 : totalPoints}</strong>
                <hr />
                <strong>Total Price: Rs. {totalPrice}</strong>
                {!usePoints && (
                  <Button onClick={handleUsePoints} variant='primary' style={{ width: '100%', marginTop: '10px' }}>
                    Use Points : {totalPoints<=0? 0 : totalPoints}
                  </Button>
                )}
                <Button onClick={handleCheckout} variant='primary' style={{ width: '100%', marginTop: '10px' }}>
                  Proceed to checkout
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )  
}

export default Cart
