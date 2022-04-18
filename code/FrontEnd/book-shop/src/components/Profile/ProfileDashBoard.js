import React from 'react'
import { Card, Container, Row, Col, Modal, Button} from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useSessionUser } from '../../Hooks/useSessionUser';
import "./Dashboard.css"

export const ProfileDashBoard = () => {
    const {sessionUser} = useSessionUser();
    const history = useHistory();

    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        history.push("/")

    }
    const handleCloseOk = () => {
        setShow(false)
        history.push("/login")
    }


    const goToURL = (url) => {
        history.push(url);
    };

    if (sessionUser.username==="")
    {
        return (
            <div className='main-wrapper-management-page-dashboard'>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Not Logged in!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please login to access your profile.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseOk}>
                        Log in
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
    else
    {
        return (
            <div className='main-wrapper-management-page-dashboard'>
                <Container>
                    <div className='paddingContainerDashboard'>
                    <Row>
                        <Col>
                            <div className='buttonCustomDashboard'>
                                <Card tag='a' onClick={()=>{goToURL("/orders/purchase-history");}} style={{cursor: 'pointer'}}>
                                <Card.Img variant="top" src="https://static.thenounproject.com/png/2258479-200.png" />
                                <Card.Body>
                                <Card.Text className='text-center'>
                                    Purchase History
                                </Card.Text>
                                </Card.Body>
                                </Card>
                            </div>
                        </Col>
                        <Col>
                            <div className='buttonCustomDashboard'>
                                <Card tag='a' onClick={()=>{goToURL("/orders/seller-history");}} style={{cursor:'pointer'}}>
                                <Card.Img variant="top" src="https://static.thenounproject.com/png/2900961-200.png" />
    
                                <Card.Body>
                                <Card.Text className='text-center'>
                                    Seller History
                                </Card.Text>
                                </Card.Body>
                                </Card>      
                            </div>
                        </Col>
                        <Col>
                            <div className='buttonCustomDashboard'>
                                <Card tag='a' onClick={()=>{goToURL("/my-listings");}} style={{cursor: 'pointer'}}>
                                <Card.Img variant="top" src="https://static.thenounproject.com/png/155458-200.png" />
                                <Card.Body>
                                <Card.Text className='text-center'>
                                    My Listings
                                </Card.Text>
                                </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    </div>
    
                </Container>
    
          </div>
        )
    }

}
