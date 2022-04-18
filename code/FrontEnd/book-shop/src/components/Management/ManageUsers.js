import React from 'react'
import { useEffect, useState} from 'react'
import { Table, Container, Row, Col, Button, Modal} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import "./Management.css"
import { useHistory } from 'react-router'
import { useSessionUser } from '../../Hooks/useSessionUser'

export const ManageUsers = () => {
    const history = useHistory();
    const [tableData, setTableData] = useState();
    const [tableDataLoaded, setTableDataLoaded] = useState(false);

    const {loggedIn, userType} = useSessionUser();

    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        history.push("/")

    }
    const handleCloseOk = () => {
        setShow(false)
        history.push("/login")
    }


    const populateData = async () =>
    {
        try
        {
            const response = await axios('http://localhost:8080/api/users/getallusers');

            return response.data;
        }
        catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData(){
            if (tableDataLoaded === false)
            {
                const fetchedData = await populateData();
                console.log(fetchedData);
                setTableData(fetchedData);
                setTableDataLoaded(true);
            }
        }
        fetchData();
    }, [tableDataLoaded, tableData])


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
        if (tableData)
        {
            const allUsers = tableData.map(user => {
                return (
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.phone}</td>
                        <td>{user.userType}</td>
                    </tr>
                )
            })
    
            return (
                <div>
                    {
                        userType.admin === true
                        ? 
                        (
                            <div className='main-wrapper-management-page'>
                                    <Container>
                                    <h1>
                                        Current users registered in system
                                    </h1>
                                    <div style={{'marginTop':'2%'}}>
                                        <Table bordered striped hover>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Username</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Phone</th>
                                                    <th>Type</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allUsers}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Container>
                                <Container>
                                    <Row>
                                        <Col>
                                            <div style={{'marginTop':'2%'}}>
                                                <NavLink to = "/management">
                                                    <Button variant='danger' style={{width:'100px', float:'left'}}>
                                                        Back
                                                    </Button>
                                                </NavLink>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )
                        :
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
                    }
                
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
                                <h1>
                                    Current users registered in system
                                </h1>
                            </Container>
                        </div>
                        )
                        :
                        (
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
         
            </div>
    
            )
        }
    }
    
}
