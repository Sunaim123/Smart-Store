import { useRef } from 'react'
import { Card, Button, Container, Row, Col, Image } from 'react-bootstrap'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as productApis from "../utilities/apis/product"
import { url } from "../utilities/enumerations/constants"
import { addToCart } from '../store/cart'
import CategoryLogo from '../assets/images/grid-logo.svg'
import PriceLogo from '../assets/images/dollar-logo.svg'
import StoreLogo from '../assets/images/store-logo.svg'

function CompareProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token, user } = useSelector((state) => state.user)
    const titleRef = useRef(null)
    const priceRef = useRef(null)
    const categoryRef = useRef(null)
    const nicheRef = useRef(null)
    const [products, setProducts] = useState([])
    const [rows, setRows] = useState([])
    const [active, setActive] = useState(1)
    const params = new URLSearchParams(window.location.search)
    const limit = 1000

    const handleClick = (id) => {
        navigate(`/product?id=${id}`)
    }

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

    const handleSearch = (e) => {
        e.preventDefault()
        const where = {}

        if (priceRef.current.value) where.price = priceRef.current.value
        if (categoryRef.current.value) where.category = categoryRef.current.value
        if (nicheRef.current.value) where.niche = nicheRef.current.value
        if (titleRef.current.value) {
            where.query = titleRef.current.value
        }
        const query = new URLSearchParams(where)
        getProducts(query)
    }

    const getProducts = async (query = "") => {
        try {
            const response = await productApis.getProducts(token, query.toString())
            if (!response.status) throw new Error(response.message)

            setProducts(response.products)
            setRows(response.products.slice(0, limit))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleAddToCart = (productId) => {
        if (!user) { alert("login to continue") }
        else {
            const selectedProduct = products.find((product) => product.id === productId)
            if (selectedProduct) {
                dispatch(addToCart(selectedProduct))
                alert('Product added to cart')
            }
        }
    }


    useEffect(() => {
        getProducts(params)
    }, [])

    useEffect(() => {
        setRows(products.slice((active - 1) * limit, active * limit))
    }, [products.length])

    useEffect(() => {
        setRows(products.slice((active - 1) * limit, active * limit))
    }, [active])

    return (
        <>
            <section className='py-1'>
                <Container fluid="md" style={{ marginBottom: 50 }}>
                    <form onSubmit={handleSearch} className='product-search-form'>
                        <Row className='align-items-center'>
                            <Col lg={5} className='column mb-lg-0 mb-2'>
                                <Row>
                                    <Col md={6} className='mb-4 mb-md-0'>
                                        <div className='input-field-wrap'>
                                            <label className='field-label'>
                                                Product
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                ref={titleRef}
                                                style={{
                                                    width: "230px",
                                                    borderRadius: "10px",
                                                    height: "40px"
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col md={6} className='mb-4 mb-md-0'>
                                        <div className='input-field-wrap'>
                                            <label className='field-label'>
                                                Product Type
                                            </label>
                                            <div className='field-wrap d-flex align-items-center'>
                                                <Image src={CategoryLogo} width={20} height={20} className='me-3' />
                                                <select ref={nicheRef} name="niche" id="niche" className='select-field'>
                                                    <option value="" selected>All</option>
                                                    <option value="0">Health Care</option>
                                                    <option value="1">Grocery</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={5} className='column mb-lg-0 mb-4'>
                                <Row>
                                    <Col md={6} className='mb-4 mb-md-0'>
                                        <div className='input-field-wrap'>
                                            <label className='field-label'>
                                                Price
                                            </label>
                                            <div className='field-wrap d-flex align-items-center'>
                                                <Image src={PriceLogo} width={20} height={20} className='me-3' />
                                                <select ref={priceRef} name="price" id="price" className='select-field'>
                                                    <option value="0">Any</option>
                                                    <option value="1">Below Rs. 1000</option>
                                                    <option value="2">Rs. 1000 - 2000</option>
                                                    <option value="3">Rs. 2000 - 3000</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6} className='mb-4 mb-md-0'>
                                        <div className='input-field-wrap'>
                                            <label className='field-label'>
                                                Store
                                            </label>
                                            <div className='field-wrap d-flex align-items-center'>
                                                <Image src={StoreLogo} width={20} height={20} className='me-3' />
                                                <select ref={categoryRef} name="category" id="category" className='select-field'>
                                                    <option value="" selected>Store</option>
                                                    <option value="1">Chase</option>
                                                    <option value="2">Naheed</option>
                                                    <option value="3">Metro</option>
                                                    <option value="4">Karyana</option>
                                                    <option value="5">Dawaai</option>
                                                    <option value="6">Dvago</option>
                                                    <option value="7">Time Medico</option>
                                                    <option value="8">Medical Store</option>

                                                </select>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={2}>
                                <button type="submit" className='submit-field' >Search</button>
                            </Col>
                        </Row>
                    </form>
                </Container>
            </section>
            <div className="row my-6">
                {rows.map((element, index) => {
                    const lowestPrice = Math.min(...products.map(product => product.price))
                    const isLowestPrice = element.price === lowestPrice

                    return (
                        <div className="col-md-3 col-sm-6 col-6 mb-4" key={element.url}>
                            <Card style={{ width: '100%', height: "100%", backgroundColor: isLowestPrice ? "#ff3636b5" : "#ffeac6", border: "solid", borderRadius: "18px" }}>
                                <Card.Img style={{ borderRadius: 10, position: 'relative' }} src={element.thumbnail.replace("public", url)} />
                                <div style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#ff3636', padding: '2px 8px', borderRadius: 5 }}>{getStoreName(element.category)}</div>
                                <Card.Body>
                                    <Card.Title>{element.title}</Card.Title>
                                    <Card.Text variant="primary">Rs. {element.price}</Card.Text>
                                    <Button onClick={() => handleClick(element.id)} style={{ width: "100%", bottom: 10, backgroundColor: '#ffd080', borderColor: '#ffd080', transform: 'translateX(0%)' }}>View</Button>
                                    &nbsp;
                                    <Button onClick={() => handleAddToCart(element.id)} style={{ width: "100%", bottom: 10, backgroundColor: '#ffd080', borderColor: '#ffd080', transform: 'translateX(0%)' }}>Add To Cart</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CompareProduct
