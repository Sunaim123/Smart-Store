import { useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Container, Row, Col, Image, Button, input } from 'react-bootstrap'
import ChooseProductLogo from '../assets/images/bookmark-logo.svg'
import * as productApis from "../utilities/apis/product"
import CategoryLogo from '../assets/images/grid-logo.svg'
import PriceLogo from '../assets/images/dollar-logo.svg'
import StoreLogo from '../assets/images/store-logo.svg'

function SearchFrom() {
    const navigate = useNavigate()
    const { token, user } = useSelector((state) => state.user)
    const titleRef = useRef(null)
    const priceRef = useRef(null)
    const categoryRef = useRef(null)
    const nicheRef = useRef(null)

    const handleSearch = (e) => {
        // e.preventDefault()
        const where = {}

        if (priceRef.current.value) where.price = priceRef.current.value
        if (categoryRef.current.value) where.category = categoryRef.current.value
        if (nicheRef.current.value) where.niche = nicheRef.current.value
        if (titleRef.current.value) {
            where.query = titleRef.current.value
        }
        const query = new URLSearchParams(where)
        navigate(`/products?${query}`)
    }

    return (

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
    )
}

export default SearchFrom
