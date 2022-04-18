import React from 'react'
import "./Dashboard.css"
import {Table, Container, Col, Row, Button, Modal, Alert} from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useSessionUser } from '../../Hooks/useSessionUser'
import {useHistory} from 'react-router'

export const PurchaseHistory = () => {
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

    const [showErrorCancel, setShowErrorCancel] = useState(false);
    const [messageCancel, setMessageCancel] = useState({
        failure: false,
        message: ""
    })


  
    const [tableData, setTableData] = useState();
    const [tableDataLoaded, setTableDataLoaded] = useState(false);
    const {sessionUser} = useSessionUser();

    const populateData = async () =>
    {
        try
        {
            const config = {
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
            }

            const data = {
                username:sessionUser.username
            }
            const response = await axios.post('http://localhost:8083/api/transactionss/gettransactionsbyusername', data, config);
            console.log("reponse: ", response)
            return response.data;
        }
        catch (error)
        {
            console.log(error);
        }
    }

    const cancelItem = async (transactionId) =>
    {
        try{
            const config = {
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
            }

            const data = {
                id:transactionId
            }
            const response = await axios.post('http://localhost:8083/api/transactionss/canceltransaction', data, config);
            console.log("reponse: ", response)
            window.location.reload(false);
        }
        catch (error) {
            console.log(error)
            setMessageCancel({
                failure:true,
                message:"Can only delete cancellable items."
            });
            setShowErrorCancel(true);
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
    }, [tableDataLoaded, tableData, sessionUser, cancelItem])


    if (sessionUser.username === "")
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
        if (tableData)
        {
            if (tableData.asBuyer)
            {
                const allTransactions = tableData.asBuyer.map(transaction => {
                    return (
                        <tr>
                            <td>{transaction.id}</td>
                            <td>{transaction.listingId}</td>
                            <td>{transaction.seller}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.status}</td>
                            <td >
                               
                                <button className='tableButtonPurchaseHistory' onClick={()=> {cancelItem(transaction.id)}}>
                                    <img src='http://cdn.onlinewebfonts.com/svg/img_439489.png'/>
                                </button>
                            </td>
                
                        </tr>
                    )
                })
        
                return (
                    <div className='main-wrapper-management-page-dashboard'>
    
                            <Container>
                                {
                                    showErrorCancel === true && messageCancel.failure
                                    ?
                                    <Alert variant="danger" onClose={() => setShowErrorCancel(false)} dismissible>
                                    <Alert.Heading>Error</Alert.Heading>
                                    <p>
                                        {messageCancel.message}
                                    </p>
                                    </Alert>
                                    :
                                    <></>
                                }
                                    
                            <h1>
                                Buy Orders
                            </h1>
                                <div style={{'marginTop':'2%'}}>
                                    <Table bordered striped hover>
                                        <thead>
                                            <tr>
                                                <th>Transaction ID</th>
                                                <th>Listing ID</th>
                                                <th>Seller</th>
                                                <th>Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allTransactions}
                                        </tbody>
                                    </Table>
                                </div>
                            </Container>
                            <Container>
                                <Row>
                                    <Col>
                                        <div style={{'marginTop':'2%'}}>
                                            <NavLink to = "/profile">
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
            }
            else
            {
                return (
                    <div className='main-wrapper-management-page-dashboard'>
                    <Container>
                        <h1>
                            Current Buy Orders
                        </h1>
                    </Container>
                </div>
                )
            }
        }
        else
        {
            return (
                <div className='main-wrapper-management-page-dashboard'>
                <Container>
                    <h1>
                        Current Buy Orders
                    </h1>
                </Container>
            </div>
            )
        }
            
    }
   
}