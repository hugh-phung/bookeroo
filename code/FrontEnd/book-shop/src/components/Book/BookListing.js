import React from 'react'
import { useState } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router';
import { useEffect } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import { useSessionUser } from '../../Hooks/useSessionUser';
import "./BookListings.css"
import { useHistory } from 'react-router';

export const BookListing = ({bookID}) => {
    const history = useHistory();

    const [tableDataUsed, setTableDataUsed] = useState([]);
    const [tableDataNew, setTableDataNew] = useState([]);

    const [book, setBook] = useState({id: 0});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [listings, setListings] = useState();

    // Keeps track of current user
    const {loggedIn} = useSessionUser();
    const {sessionUser} = useSessionUser();


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleCloseOk = () => {
        setShow(false)
        if (!loggedIn)
        {
            goToURL('/login');
        }
    };

    const goToURL = (url) =>
    {
        history.push(url);
    }

    const handleShow = () => setShow(true);

    const [messagePrompt, setMessagePrompt] = useState({
        title:"",
        message:"",
        ok:""
    });

    const populateData = async (request) =>
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
              withCredential: true
            }

            if (request === "getBook")
            {
                const bookRequest = {
                    id:parseInt(bookID)
                }

                const response = await axios.post("http://localhost:8081/api/books/getbook", bookRequest, config);
    
                return response.data;
            }

            else if (request === "getListings")
            {
                const listingRequest = {
                    bookId:parseInt(bookID)
                }
                    
                const response = await axios.post("http://localhost:8082/api/listings/getlistingsbybookid", listingRequest, config);
                return response.data;
            }

        }  catch(error)
        {
            console.log(error)
        }
    }

    // Combines two sets of fetched data to grab the listings matching
    useEffect(() => {
        async function fetchData(){
            if (dataLoaded === false) {
                const bookData = await populateData("getBook");
                const listingsData = await populateData("getListings");

                if (listingsData && bookData)
                {
                    if (!listingsData.results && !bookData.results)
                    {
                        let dataNew = []
                        let dataUsed = []

                        if (listingsData.new)
                        {
                            for(const listing of listingsData.new){
                                let listingItem = {
                                    id:listing.id,
                                    seller:listing.seller,
                                    type:listing.type,
                                    price:listing.price,
                                    sold:listing.sold
                                    
                                }
    
                                if(listing.bookId === bookData.id){
                                    listingItem = {
                                        ...listingItem, 
                                        title:bookData.title,
                                        author:bookData.author
                                    }
    
                                    dataNew.push(listingItem)
                                }
    
                            }
                        }


                        if (listingsData.used)
                        {
                            for(const listing of listingsData.used){
                                let listingItem = {
                                    id:listing.id,
                                    seller:listing.seller,
                                    type:listing.type,
                                    price:listing.price,
                                    sold:listing.sold
                                    
                                }
    
                                    if(listing.bookId === bookData.id){
                                        listingItem = {
                                            ...listingItem, 
                                            title:bookData.title,
                                            author:bookData.author
                                        }
                                        dataUsed.push(listingItem)
                                    }
    
                            }
                        }

                        setTableDataNew(dataNew); 
                        setTableDataUsed(dataUsed);  

                        setDataLoaded(true)
                    } 
                }
                else
                {
                    setBook()
                    setListings()
                    setDataLoaded(true)
                }
            }
        }
        fetchData();

    }, [dataLoaded, tableDataNew, tableDataUsed, listings, book])

    const buyButton = async (selectedListingID) => 
    {
        // console.log(selectedListingID)
        if (loggedIn)
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
                  withCredential: true
                }
                
                const data = {
                    listingId:selectedListingID,
                    userId:sessionUser.id
                }
    
                const response = await axios.post('http://localhost:8084/api/carts/additem', data, config);
    
                if (response.status === 201)
                {
                    setMessagePrompt({
                        title:"Success",
                        message:"Item added to cart",
                        ok:"OK"
                    })
                    handleShow();
    
                }
            }
            catch
            {
                setMessagePrompt({
                    title:"Oops!",
                    message:"Item already in cart",
                    ok:"OK"
                })
                handleShow();
            }
        }
        else
        {
            setMessagePrompt({
                title:"Not Logged in!",
                message:"Please login to purchase or create a listing for a book.",
                ok:"Log in"
            })
            handleShow();
        }
        
    }
    

    if (tableDataUsed || tableDataNew)
    {
        const displayTableDataUsed = tableDataUsed.map(listItem => 
            {
                return (
                    
                    <tr>
                    <td>{listItem.id}</td>
                    <td>{listItem.seller}</td>
                    <td>{listItem.type}</td>
                    <td>{listItem.price}</td>
                    <td> 
                        <button className='tableButton' onClick={()=> {buyButton(listItem.id)}}>
                            <img src='https://i.pinimg.com/originals/15/4f/df/154fdf2f2759676a96e9aed653082276.png'/>
                        </button>
                    </td>
                    </tr>
                )
            }
        )
        const displayTableDataNew = tableDataNew.map(listItem => 
            {
                return (
                    <tr>
                    <td>{listItem.id}</td>
                    <td>{listItem.seller}</td>
                    <td>{listItem.type}</td>
                    <td>{listItem.price}</td>
                    <td> 
                        <button className='tableButton' onClick={()=> {buyButton(listItem.id)}}>
                            <img src='https://i.pinimg.com/originals/15/4f/df/154fdf2f2759676a96e9aed653082276.png'/>
                        </button>
                    </td>
                    </tr>
                )
            })
        
        return (
            <div>
                <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{messagePrompt.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{messagePrompt.message}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseOk}>
                        {messagePrompt.ok}
                    </Button>
                    </Modal.Footer>
                </Modal>
                </>
                <Container>
                    <div className = 'tableList'>
                        <h3>
                            New Books for Sale
                        </h3>
                    <Table bordered>
                        <thead style={{'backgroundColor':'gainsboro'}}>
                            <tr>
                            <th>Listing ID </th>
                            <th>Seller</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Buy</th>
                
                            </tr>
                        </thead>
                        <tbody>
                            {displayTableDataNew}
                        </tbody>

                    </Table>
                    </div>
                    <div className = 'tableList'>
                        <h3>
                            Used books for Sale
                        </h3>
                    <Table bordered>
                        <thead>
                            <tr style={{'backgroundColor':'gainsboro'}}>
                            <th>Listing ID </th>
                            <th>Seller</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Buy</th>

                            </tr>
                        </thead>
                        <tbody>
                            {displayTableDataUsed}
                        </tbody>

                    </Table>
                    </div>
                </Container>
            </div>
        )
    }
    else
    {
        return (
            <div>
            <Container>
                <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Listing ID </th>
                        <th>Seller</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Buy</th>
           
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>

                </Table>
                </div>
                <div>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Listing ID </th>
                            <th>Seller</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Buy</th>

                
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>

                    </Table>
                </div>
            </Container>
        </div>
        )
    }

}

