import React from 'react'
import { Container, Row, Col, Figure, Image } from 'react-bootstrap'
import BgImage from '../assets/images/right-square-bg-image.png'
import DealSlider from './DealSlider'

function ExclusiveDeals() {
    const BackgroundImage = {
        backgroundImage: `url(${BgImage})`
    }
    return (
        <section className='exclusive-deals-section' style={BackgroundImage}>
            <Container fluid="lg">
                <h2 className='head-h2 gradient-color fw-bold mb-5'>Exclusive Deals</h2>
            </Container>
            <DealSlider/>
        </section>
    )
}

export default ExclusiveDeals
