import React from "react"
import { Container, Row, Col } from 'react-bootstrap'

const Content = ({ title, introduction, vision, mission, title2, title3, dataDrivenAnalysis, personalizedRecommendations, seamlessUI, rewardingLoyalty }) => {

    return (
        <section className='listing-section'>
            <Container fluid="lg">
                <h3 className='head-h3 fw-bold gradient-color mb-md-2 mb-4'>{title}</h3>
                <Row className='align-items-center'>
                    <Col md={12} className='mb-4 mb-md-0'>
                        <p>{introduction}</p>
                        <h3 className='head-h3 fw-bold gradient-color mb-md-2 mb-4'>{title2}</h3>
                        <p>{vision}</p>
                        <p>{mission}</p>
                        <h3 className='head-h3 fw-bold gradient-color mb-md-2 mb-4'>{title3}</h3>
                        <p>{dataDrivenAnalysis}</p>
                        <p>{personalizedRecommendations}</p>
                        <p>{seamlessUI}</p>
                        <p>{rewardingLoyalty}</p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
export default Content