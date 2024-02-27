import React from 'react'
import { Form, Button,Container,Col,Row } from 'react-bootstrap'

const ContactForm = () => {
  return (
    <section className='listing-section'>
        <Container fluid="lg">
            <Row className='align-items-center'>
                <Col md={12} className='mb-4 mb-md-0'>
                    <Form>
                        <Form.Group controlId="formName" className='head-h4 fw-600 red-80 mb-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className='head-h4 fw-600 red-80 mb-2'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" />
                        </Form.Group>

                        <Form.Group controlId="formMessage"className='head-h4 fw-600 red-80 mb-2'>
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default ContactForm