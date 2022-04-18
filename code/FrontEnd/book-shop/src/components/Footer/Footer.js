import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'

export const Footer = () => {

    return (
        <div className='footer'>
            <Container className='contact-content debug-border'>
                <Row className='justify-content-center'>
                    <Col md={2} className='text-center'>
                        <div style={{paddingTop:'7%'}}>
                        &copy; 2021 Bookeroo
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
