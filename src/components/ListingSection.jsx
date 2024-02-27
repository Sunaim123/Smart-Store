import React from 'react'
import { Container, Row, Col, Figure, Image } from 'react-bootstrap'
import BgImage from '../assets/images/left-square-bg-image.png'
import ListingImage from '../assets/images/listing-image.png'

function ListingSection() {
    const BackgroundImage = {
        backgroundImage: `url(${BgImage})`
    }
    return (
        <section className='listing-section' style={BackgroundImage}>
            <Container fluid="lg">
                <h3 className='head-h3 fw-bold gradient-color mb-md-5 mb-4'>Simplify Your Shopping Experience with Our Powerful Platform</h3>
                <Row className='align-items-center'>
                    <Col md={6} className='mb-4 mb-md-0'>
                        <ul className='list-unstyled red-80 fw-600 mb-0 point-listing'>
                            <li>
                                Extensive product database Price
                            </li>
                            <li>
                                Price comparison tool
                            </li>
                            <li>
                                Personalized recommendations
                            </li>
                            <li>
                                User reviews and ratings
                            </li>
                            <li>
                                Advanced search filters
                            </li>
                            <li>
                                Price history and trends
                            </li>
                            <li>
                                Alerts and notifications
                            </li>
                            <li>
                                Trustworthy and reliable data
                            </li>
                            <li>
                                Time-saving and convenient shopping experience
                            </li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <Figure className='mb-0 image'>
                            <Image src={ListingImage} width="100%" />
                        </Figure>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ListingSection
