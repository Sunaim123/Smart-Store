import React, { useEffect, useState, useRef } from 'react'
import { Container, Form, Button, Card, Modal } from 'react-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import * as orderApis from "../utilities/apis/order"
import * as userApis from "../utilities/apis/user"
import { emptyCart } from '../store/cart'
import DashboardHeader from "../components/DashboardHeader.jsx"

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, user } = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart)
  const [ showPopup, setShowPopup] = useState(false)
  const [earnedPoints, setEarnedPoints] = useState(0)
  const dateRef = useRef(null)
  const timeRef = useRef(null)
  const noteRef = useRef(null)
  const mobileRef = useRef(null)
  const addressRef = useRef(null)
  const [totalPrice, setTotalPrice] = useState(cart.reduce((total, product) => total + product.price, 0))
  const [usePoints, setUsePoints] = useState(false)
  const [totalPoints, setTotalPoints] = useState(0)

  const calculatePoints = (totalPrice) => {
    let points = 0
    if (totalPrice >= 1000 && totalPrice < 2000) {
      points = 15
    } else if (totalPrice >= 2000 && totalPrice < 3000) {
      points = 20
    } else if (totalPrice >= 3000 && totalPrice < 4000) {
      points = 25
    } else if (totalPrice >= 5000 && totalPrice < 6000) {
      points = 40
    } else if (totalPrice >= 6000) {
      points = 50
    }
    return points
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
  
      const products = cart.reduce((acc, product) => {
        const existingProductIndex = acc.findIndex(
          (item) => item.product_id === product.id
        )
  
        if (existingProductIndex !== -1) {
          acc[existingProductIndex].quantity += product.quantity
        } else {
          acc.push({
            price: product.price,
            quantity: product.quantity,
            product_id: product.id,
          })
        }
        
        return acc
      }, [])
      
      const payload = {
        order: {
          note: noteRef.current.value,
          total: totalPrice,
          mobile: mobileRef.current.value,
          address: addressRef.current.value,
        },
        order_lineitems: products,
      }
      
      const points = calculatePoints(totalPrice)
      setEarnedPoints(points)
      setShowPopup(true)
      
      const redeemablePoints = {
        id: user.id,
        points: totalPoints > 0? points + totalPoints : points
      }
      
      const pointResponse = await userApis.updateUser(token, redeemablePoints)
      if (!pointResponse) throw new Error (pointResponse.message)
      
      const response = await orderApis.createOrder(token, payload)
      if (!response.status) throw new Error (response.message)
      
      dispatch(emptyCart())
      setTimeout(() => {
        navigate("/recommended_product")
      }, 2000)
    } catch (error) {
      alert(error.message)
    }
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
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '900px', padding: '0 20px' }}>
        <h2 style={{ marginBottom: '2rem' }} className='head-h2 gradient-color fw-bold'>Checkout</h2>
        <Card style={{ backgroundColor: "#ff3636b3" }}>
          <Card.Body>
            <h5 style={{ marginBottom: '1rem' }}>Contact Information</h5>
            <Form>
              <Form.Group controlId='formMobileNumber'>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your mobile number'
                  ref={mobileRef}
                />
              </Form.Group>

              <Form.Group controlId='formAddress'>
                <Form.Label style={{marginTop:20}}>Address</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Enter your address'
                  ref={addressRef}
                />
              </Form.Group>

              <Form.Group controlId='formNote'>
                <Form.Label style={{marginTop:20}}>Note (Optional)</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Add any special notes or instructions'
                  ref={noteRef}
                />
              </Form.Group>
              <div className='col-2'>
              <Button
                variant='primary'
                type='button'
                style={{ marginTop: '1rem' }}
                onClick={handleSubmit}
              >
                Place Order
              </Button>
              <strong style={{ position: "absolute", right: 10, marginTop: 20 }}>Total Price: Rs. {totalPrice}</strong>
              {!usePoints && (
                  <Button onClick={handleUsePoints} variant='primary' style={{ position: "relative", marginTop: 10 }}>
                    Use Points: {totalPoints<=0? 0 : totalPoints}
                  </Button>
                )}
                </div>
            </Form>
          </Card.Body>
        </Card>
        <Modal show={showPopup} onHide={() => setShowPopup(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <p>Order Punched!.</p>
           <br/>
           <br/>
            {earnedPoints > 1 && (<p>You have earned {earnedPoints} points.</p>)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPopup(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
    </>
  )
}

export default Checkout
