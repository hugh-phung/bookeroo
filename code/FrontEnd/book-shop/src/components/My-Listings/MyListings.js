import React from 'react'
import { useState, useEffect} from 'react'
import { Col, Container, Row, Table, Button, Modal} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import './MyListings.css'
import { useSessionUser } from '../../Hooks/useSessionUser'
import { useHistory } from 'react-router'

export const MyListings = () => {
    const {sessionUser} = useSessionUser();
    const[dataLoaded,setDataLoaded] = useState(false);
    const[listingsData, setListingsData] = useState(null);
    const[bookData, setBookData] = useState(null);
    const[completeData, setCompleteData] = useState([]);

    const history = useHistory();
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        history.push("/login")

    }
    const handleCloseOk = () => {
        setShow(false)
        history.push("/login")
    }


    const getListingsContents = async () =>
    {
        try
        {
            const config = 
            {
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
              },

            }

            const sellerRequest = 
            {
                seller:String(sessionUser.username)
            }

            console.log("CUNT")
            const response = await axios.post('http://localhost:8082/api/listings/getlistingsbyseller', sellerRequest, config);

            console.log("Listings response", response);

            if (response.status === 200)
            {
                console.log(response.status)
                return response.data;
            }
            else
            {

            }
        }
        catch (error)
        {
            console.log(error)
        }
    }

    const getBookContents= async () =>
    {
        try
        {
            const response = await axios.get('http://localhost:8081/api/books/getallbooks');

            return response.data;
        }
        catch (error)
        {
            console.log(error)
        }
    }

    useEffect(()=>
    {
        async function fetchData() {
            console.log("GOTCHA BITCH", dataLoaded)
            if (dataLoaded === false)
            {
                const listingsDataFetched = await getListingsContents();
                const bookDataFetched = await getBookContents();
                console.log("Listings fetched", listingsDataFetched);
                console.log("Books fetched", bookDataFetched);

                if (listingsDataFetched && bookDataFetched)
                {
                    if (!listingsDataFetched.results && !bookDataFetched.results)
                    {
                        let data = []
                        console.log("AFFFAFF", listingsDataFetched)
                        // setListingsData(listingsDataFetched);
                        // setBookData(bookDataFetched);
                        for(const listing of listingsDataFetched){
                            let listingItem = {
                                id:listing.id,
                                type:listing.type,
                                price:listing.price,
                                sold:listing.sold
                                
                            }
                            for(const book of bookDataFetched){
                                if(listing.bookId === book.id){
                                    listingItem = {
                                        ...listingItem, 
                                        bookId:book.id,
                                        title:book.title,
                                        author:book.author
                                    }
                                    data.push(listingItem)
                                }
                            }
                        }

                        console.log("Combined", data);
                        setCompleteData(data);  
                        setDataLoaded(true);
                    }   
                }
                else
                {
                    setListingsData();
                    setBookData();
                    setDataLoaded(true);
                }
            }
        }
        fetchData();

    },  [listingsData, bookData, completeData, dataLoaded])

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
        if(completeData)
        {
            console.log("listings data", listingsData)
            console.log("book data", bookData)
            const allData = completeData.map(listItem => {
                return (
                    
                    <tr>
                    <td>{listItem.id}</td>
                    <td>{listItem.bookId}</td>
                    <td>{listItem.title}</td>
                    <td>{listItem.author}</td>
                    <td>{listItem.type}</td>
                    <td>{listItem.price}</td>
                    {
                        listItem.sold
                        ?
                        (<div>
                            Sold
                        </div>)
                        :
                        (<div>
                            Not sold
                        </div>
                        )
                    }
                    </tr>
                )
            })
    
            return(
                <div className='main-wrapper-listings-page'>
                <Container>
                    <Row>
                        <div style={{'marginBottom':'3%'}}>
                        <h1>
                            My Listings
                        </h1>
                        </div>
                    </Row>
    
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Listing ID </th>
                            <th>Book ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>
    
                 
                            </tr>
                        </thead>
                        <tbody>
                            {allData}
                        </tbody>
    
                    </Table>
                    
                    <Row>
                        <Col>
                            <div style={{'marginTop':'3%'}}>
                            <div className='addListing'>
                                <NavLink to = "/create-listing">
                                <Button variant ='success' style={{width:'100px'}}>
                                    Add
                                </Button>
                                </NavLink>
                            </div>
    
                            <div >
                                <NavLink to = "/profile">
                                    <Button variant ='danger' style={{width:'100px', float:'left'}}>
                                        Back
                                    </Button>
                                </NavLink>
                            </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            
    
                </div>
            )
        }
        else{
            return (
                <div className='main-wrapper-listings-page'>
                    <Container>
                        <h1>
                            My Listings
                        </h1>
                    </Container>
                    <Container>
    
                        <Row>
                            <Col>
                                <div className='addListing'>
                                    <NavLink to = "/create-listing">
                                        <Button variant ='success' style={{width:'100px'}}>
                                            Add
                                        </Button>
                                    </NavLink>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Listing ID </th>
                            <th>Book ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>
    
                 
                            </tr>
                        </thead>
                        <tbody>
    
                        </tbody>
    
                    </Table>
                    </Container>
                </div>
        
            )
        }
    }
   
}
