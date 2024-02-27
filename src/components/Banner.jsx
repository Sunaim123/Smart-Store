import React from 'react'
import { Container, Row, Col, Figure, Image } from 'react-bootstrap'
import RedImage from '../assets/images/Red image.png'

function Banner() {
    return (
        <section className='banner-main py-5'>
            <Container fluid="lg">
                <Row className='align-items-center'>
                    <Col lg={9}>
                        <h1 className='head-h3 fw-bold gradient-color'>
                            Unlock smarter shopping with our platform Compare prices, find recommendations - for healthcare and groceries
                        </h1>
                        <div className='content-container'>
                            <h4 className='head-h4 fw-600 red-80'>
                                Unlock smarter shopping with our platform: Compare prices, find recommendations - for healthcare and groceries
                            </h4>
                            <form className='get-started-form'>
                                <div className='input-field-wrap'>
                                    <input className='input-field' type="email" name="email" id="email" placeholder='Enter your email' />
                                    <input type="submit" value="Get started" />
                                </div>
                                <h5 className='head-h5 form-point'>
                                    <i class="fa-solid fa-circle-check"></i>
                                    No credit card required
                                </h5>
                            </form>
                        </div>
                    </Col>
                    <Col lg={3}>
                        <Figure className='mb-0'>
                            <Image className='red-banner-img' src={RedImage} />
                        </Figure>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner
