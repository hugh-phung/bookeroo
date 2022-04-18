import React from 'react'
import './Management.css';
import { Button, Row, Col, Container, Modal} from 'react-bootstrap'
import { Image } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSessionUser } from '../../Hooks/useSessionUser';
import { useState } from 'react';

export const Management = () => {
    const {loggedIn, userType} = useSessionUser();
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

    const goToBookManagement = () => {
        history.push("/management/books");
    };

    const goToUserManagement = () => {
        history.push("/management/users");
    };

    if (!loggedIn)
    {
        return (
            <div className='main-wrapper-management-page'>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Not Logged in!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please login as admin to access system management.</Modal.Body>
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
            <div>
                {
                    userType.admin === true
                    ?
                    (
                        <div className='main-wrapper-management-page'>
                            <Container>
                                <div className='paddingContainer'>
                                <Row>
                                    <Col>
                                        <div className='buttonCustom'>
                                            <Card tag='a' onClick={goToBookManagement} style={{cursor: 'pointer'}}>
                                            <Card.Img variant="top" src="https://www.iconpacks.net/icons/2/free-opened-book-icon-3163-thumb.png" />
                                            <Card.Body>
                                            <Card.Text className='text-center'>
                                                Manage Books
                                            </Card.Text>
                                            </Card.Body>
                                            </Card>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='buttonCustom'>
                                            <Card tag='a' onClick={goToUserManagement} style={{cursor:'pointer'}}>
                                            <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />

                                            <Card.Body>
                                            <Card.Text className='text-center'>
                                                Manage Users
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
                    :
                    (
                        <div className='main-wrapper-management-page'>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>No Authorisation!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Please login as admin to access system management.</Modal.Body>
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
            </div>
        )
    }
}
