import React from 'react'
import { Container, Row, Col, Figure, Image } from 'react-bootstrap'
import JoinUsImg from '../assets/images/JoinUs.png'

function JoinUs() {
    return (
        <section className='joinus-section position-relative'>
            <Container fluid="lg">
                <Row className='align-items-center'>
                    <Col md={6} className='mb-4 mb-md-0 mb-md-0 mb-4'>
                        <h2 className='head-h2 gradient-color fw-bold'>Join us for Exclusive Deals, Engaging Discussions, and Expert Guidance. Start Connecting Today</h2>
                    </Col>
                    <Col md={6}>
                        <Figure className='mb-0 image '>
                            <Image src={JoinUsImg} />
                        </Figure>
                    </Col>
                </Row>
            </Container>
            <div className="background-text px-3 text-center">
                SHOP NOW
            </div>
        </section>
    )
}

export default JoinUs