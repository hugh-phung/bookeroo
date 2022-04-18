import React, {useState, useEffect} from 'react'
import { Button, Table, Container, Row, Col, Modal} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import './ManageBooks.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useSessionUser } from '../../Hooks/useSessionUser';


export const ManageBooks = () => {
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

    const[dataLoaded,setDataLoaded] = useState(false);
    const[data, setData] = useState();

    const getTableContents = async () =>
    {
        try
        {
            const response = await axios.get('http://localhost:8081/api/books/getallbooks');

            return response.data;
        }
        catch (error)
        {

        }
    }

    useEffect(()=>
    {
        async function fetchData() {
            if (dataLoaded === false)
            {
                const booksData = await getTableContents();
                console.log(booksData);
                setData(booksData);
                setDataLoaded(true);
            }
        }
        fetchData();
    }, [dataLoaded, data])


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
        if(data){
            const allBooksData = data.map(book => {
                return (
                    
                    <tr>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    {/* <td>
                        ${book.price} */}
                    {/* <Form>
                        <Form.Label
                            className="me-sm-2"
                            htmlFor="inlineFormCustomSelect"
                            visuallyHidden
                            >
                            Pending
                        </Form.Label>
                        <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
                            <option value="0">Pending</option>
                            <option value="1">Accepted</option>
                            <option value="2">Rejected</option>
                        </Form.Select>
                    </Form> */}
                    {/* </td> */}
            
                    </tr>
                
                    
                )
            })
            return(
                <div>
                {
                    userType.admin !== true
                    ?
                    (
                    <div className='main-wrapper-management-page-dashboard'>
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
                    :
                    (
                        <div className='main-wrapper-management-page'>
                 
                        <Container>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Book ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    {/* <th>Price</th> */}
            
                                    </tr>
                                </thead>
                                <tbody>
                                    {allBooksData}
                                </tbody>
            
                            </Table>
                            
                        </Container>

                        <Container>
                            <Row>
                                <Col>
                                    <div style={{paddingTop:'3%'}}>
                                        <NavLink to = "/management">
                                            <Button variant='danger' style={{width:'100px', float:'left'}}>
                                                Back
                                            </Button>
                                        </NavLink>
                                    </div>
                                </Col>
                                <Col>
                                    <div style={{paddingTop:'3%'}}>
                                        <NavLink to = "/management/books/add">
                                            <Button variant ='success' style={{width:'100px', float:'right'}}>
                                                Add
                                            </Button>
                                        </NavLink>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    
            
                        </div>
                    )
    
                }
                </div>
            )
        }
        else{
            return (
                <div className='main-wrapper-management-page'>
                    {
                        userType.admin !== true
                        ?
                        (
                        <div className='main-wrapper-management-page-dashboard'>
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
                        :
                        (
                            <div className='main-wrapper-management-page'>
                
                            </div>
                        )
                    }
                
                </div>
            )
        }
    }
    }
    
