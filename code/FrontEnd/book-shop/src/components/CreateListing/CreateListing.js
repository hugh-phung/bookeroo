import React from 'react'
import { useState, useEffect} from 'react'
import { Col, Container, Row, Table, Button, FormLabel, Alert} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { useSessionUser } from '../../Hooks/useSessionUser'
import "./CreateListing.css"

export const CreateListing = () => {

    // states for data
    const[dataLoaded, setDataLoaded] = useState(false)
    const [books, setBooks] = useState()
    const {sessionUser} = useSessionUser();

    // states for input
    const [selectedBook, setSelectedBook] = useState(1);
    const [type, setSelectedType] = useState("");
    const [price, setPrice] = useState();

    // states for alert message 
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        success: false,
        failure: false,
        message: ""
    })

    const populateData = async () => 
    {
        try 
        {
            const responseGetData = await axios.get('http://localhost:8081/api/books/getallbooks');
            return responseGetData.data;
          
        }   
        catch(error)
        {
          console.log(error);
        }
    }
    
    // fetches data from books to list in the drop down box
    useEffect(() => {
        console.log("Session user", sessionUser)
        async function fetchData(){
            if(dataLoaded === false){
                const booksData = await populateData()
                setBooks(booksData)
                setDataLoaded(true)
            }
        }
        fetchData()
       
    }, [dataLoaded])
    
    // Sends request to make new listing.
    // Also checks if inputs are correct.
    const submit = async () =>
    {
        if (type === "")
        {
            setShow(true);
            setMessage({
                success:false,
                failure:true,
                message:"Please select whether the condition of your book is new or used."
            });

            return;
        }
        else if (isNaN(price))
        {
            setShow(true);
            setMessage({
                success:false,
                failure:true,
                message:"Incorrect 'price' field. Must be a number."
            });
            return;
        }
     
            try
            {
                const config = {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    withCredential: true
                }

                const data = {
                    seller: sessionUser.username,
                    price: price,
                    type: type,
                    bookId:selectedBook
                }

                const response = await axios.post("http://localhost:8082/api/listings/addlisting", data, config);

                if (response.status === 201)
                {
                    setShow(true)
                    setMessage({
                        success:true,
                        failure:false,
                        message:"Listing successfully created"
                    })
                }

                console.log("Listings response", response.data)
                return response.data;
            }

            catch(error)
            {
                setShow(true);
                setMessage({
                    success: false,
                    failure: true,
                    message: "Bad response"
                });
            }
        
    }
    
    if (books)
    {
        const booksList = books.map(book => {
            return (
                <option value = {book.id}>{book.title}</option>
            )
        })
        return (
            <div>
                <div>
                    <Container>
                        {
                            show === true && message.success
                            ?
                            <Alert variant='success' onClose={()=> setShow(false)} dismissible>
                            <Alert.Heading> Success </Alert.Heading>
                            <p>
                                {message.message}
                            </p>
                            </Alert>
                            :
                            <></>
                        }

                        {
                            show === true && message.failure
                            ?
                            <Alert variant='danger' onClose={()=> setShow(false)} dismissible>
                            <Alert.Heading> Failure </Alert.Heading>
                            <p>
                                {message.message} 
                            </p>
                            </Alert>
                            :
                            <></>
                        }
                        <Form>
                        <Form.Group>
                                <Form.Label as='legend'>Book</Form.Label>
        
                                <Form.Label
                                    className="me-sm-2"
                                    htmlFor="inlineFormCustomSelect"
                                    visuallyHidden
                                    >
                                    Select Book
                                </Form.Label>
                                <Form.Control as ="select" name='book' value={selectedBook} onChange={e=> {
                                    setSelectedBook(e.target.value);
                                    console.log(e.target.value);
                                }}>
                                    {booksList}
                                </Form.Control>
                                <br></br>
        
                            </Form.Group>

                            {/* <Form.Group className="mb-3" controlId='formBasicCheckbox'>
                                <Form.Label> Quality </Form.Label>
                                <Form.Check type='checkbox' label='New'/>

                            </Form.Group> */}

                            <fieldset>
                                <Form.Group as={Row} className="mb-3">
                                <Form.Label as="legend">
                                    Quality
                                </Form.Label>
                                <Col >
                                    <Form.Check
                                    type="radio"
                                    label="New"
                                    name="formHorizontalRadios"
                                    id="NewSelected"
                                    onClick={e => {setSelectedType("new")}}
                                    />
                                    <Form.Check
                                    type="radio"
                                    label="Used"
                                    name="formHorizontalRadios"
                                    id="OldSelected"
                                    onClick={e => {setSelectedType("used")}}
                                    />
                                </Col>
                                </Form.Group>
                            </fieldset>


                            <Form.Group className="mb-3">
                                <Form.Label as='legend'>Price</Form.Label>
                                <Form.Control placeholder="14.99" name = 'title' value= {price} onChange={e=> {setPrice(e.target.value);}}/>
                            </Form.Group>
                        </Form>
                    </Container>
                </div>

    
                <div>
                    <Container>
                        <Row>
                            <div className='backSubmit'>
                                <div className='buttonPadding'>
                                    <NavLink to='/my-listings'>
                                        <Button variant='danger'>
                                            Back
                                        </Button>
                                    </NavLink>

                                </div>
                                <div className='buttonPadding'>
                                    <Button variant='success'onClick={submit}>
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
    else

    {
        return (
            <div>

            </div>
        )
    }
    
}
