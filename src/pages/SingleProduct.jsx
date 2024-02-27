import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as productApis from '../utilities/apis/product'
import { url } from '../utilities/enumerations/constants'
import { addToCart } from '../store/cart'
import Header from "../components/Navbar.jsx"
import DashboardHeader from "../components/DashboardHeader.jsx"

function SingleProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, user } = useSelector((state) => state.user)
  const [products, setProducts] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const params = new URLSearchParams(window.location.search)

  const getStoreName = (categoryId) => {
    switch (categoryId) {
        case 1:
            return "Chase-Up"
        case 2:
            return "Naheed"
        case 3:
            return "Metro"
        case 4:
            return "Keryana"
        case 5:
            return "Dawaai"
        case 6:
            return "Dvago"
        case 7:
            return "Time Medico"
        case 8:
            return "Medical Store"
        default:
            return ""
    }
}

  const getProduct = async () => {
    try {
      const response = await productApis.getProduct(token, params.get("id"))
      if (!response.status) throw new Error(response.message)

      setProducts(response.product)
      setRelatedProducts(response.category)
    } catch (error) {
      alert(error.message)
    }
  }

  const handleAddToCart = () => {
    if (!user) {alert("login to continue")}
    else{
    dispatch(addToCart(products))
    alert('Product added to cart')
    }
  }

  const AddToCart = (productId) => {
    if (!user) {alert("login to continue")}
    else {
    const selectedProduct = products.find((product) => product.id === productId)
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct))
      alert('Product added to cart')
    }
}
  }

  const handleClick = (id) => {
    navigate(`/product?id=${id}`)
    window.location.reload()
  }

  useEffect(() => {
    
    if (params.has("id")) 
    getProduct()
  }, [])

  
  return (
    <>
    {user? <DashboardHeader/> : <Header/>}
      <Container fluid="lg">
        <div className='text-left'>
          <h2 className='head-h2 gradient-color fw-bold'>Product Details</h2>
        </div>
        <Row className="my-5">
          <Col md={6}>
            <img
              src={products?.thumbnail.replace("public", url)}
              alt="Product"
              className="img-fluid"
              />
          </Col>
          <Col md={6}>
            <h3 className="mb-3">{products?.title}</h3>
            <p className="text-muted">Rs. {products?.price}</p>
            <div style={{ width:"120px", textAlign:"center", backgroundColor: 'rgb(255 54 54 / 80%)', padding: '2px 8px', borderRadius: 5 }}>{getStoreName(products?.category)}</div>
            <br/>
            <p>
              {products?.description}
            </p>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" style={{ backgroundColor: '#ff3636b3', color: '#fff' }}>
                    Delivery & Returns
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style={{ backgroundColor: '#ffd080', color: '#fff' }}>
                  <div className="accordion-body">
                    The delivery and returns network of Shop Smart encompasses the logistics infrastructure responsible for transporting products from sellers to buyers efficiently and reliably. It ensures timely delivery of orders to customers while also managing the process of returns seamlessly, facilitating exchanges, refunds, or replacements in case of issues such as product defects or customer dissatisfaction.
                  </div>
                </div>
              </div>
            </div>
            <Button onClick={handleAddToCart} style={{ width: "100%", marginTop: 10, backgroundColor: '#ff3636b3', borderColor: '#ff3636b3', transform: 'translateX(0%)' }}>Add to Cart</Button>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <h3 className="mb-3">Related Products</h3>
            <Row xs={1} md={4} className="g-4">
              {relatedProducts.map((product) => (
                <Col key={product.id}>
                  <div className="card" style={{backgroundColor: '#FFEAC6', border: "solid", height: "100%"}}>
                  <img style={{ borderRadius: 10, position: 'relative' }} src={product.thumbnail.replace("public", url)} />
                    <div style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'rgb(255 54 54 / 80%)', padding: '2px 8px', borderRadius: 5 }}>{getStoreName(product.category)}</div>
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">Rs. {product.price}</p>
                      <Button onClick={() => handleClick(product.id)} style={{ width:"100%",  bottom: 10, backgroundColor: '#ffd080', borderColor: '#ffd080', transform: 'translateX(0%)', marginBottom: "9px" }}>View</Button>
                      <Button onClick={() => AddToCart(product.id)} style={{ width:"100%",  bottom: 10, backgroundColor: '#ffd080', borderColor: '#ffd080', transform: 'translateX(0%)' }}>Add To Cart</Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SingleProduct
