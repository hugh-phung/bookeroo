import React, {useState, useEffect} from 'react'

import {Card, Row} from 'react-bootstrap'
import { Col, Container} from 'react-bootstrap'
import { HomepageList } from './HomepageList'
import { NavLink, useHistory} from 'react-router-dom'

import './Homepage.css'

const axios = require("axios")
export const Homepage = () => {

    const history = useHistory();
    const[dataLoaded, setDataLoaded] = useState(false)
    const [books, setBooks] = useState()


    // Fetches books to display on home page and sends a request to create an admin account
    const populateData = async () => 
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
            const response = await axios.post("http://localhost:8081/api/books/populateData", config);
            const adminResponse = await axios.post("http://localhost:8080/api/users/makeAdminAccount", config);
            const responseGetData = await axios.get('http://localhost:8081/api/books/getallbooks');
            return responseGetData.data;
          
        }   
        catch(error)
        {
          console.log(error);
        }
    }
    
    useEffect(() => {
        async function fetchData(){
            if(dataLoaded === false){
                const booksData = await populateData()
                console.log("Book Data: ", booksData)
                setBooks(booksData)
                setDataLoaded(true)
            }
        }
        fetchData()
       
    }, [dataLoaded])

    const changeURL = (bookId) => {

        history.push("/book/"+ bookId)
    }
    
    if (books)
    {
        const bookDisplay = books.map(book => {
            return (
    
                <Col class='col-lg-6' md='auto'>
                <div className = 'cards'>
    
                    <Card onClick={() => changeURL(book.id)} tag='a' style={{ width: '15rem', height:'22rem', maxHeight:'22rem', cursor:'pointer'}} >
                    <Card.Img variant="top" src={book.imgURL} style={{height:'100%'}} />
                        {/* <div className='bookCardContent'>
    
                            <Card.Body>
                                <Card.Title>
                                <div className='bookCardTitle'>
                                    {book.title}
                                </div>
                                </Card.Title>
                                <Card.Text>
                                    <div className='bookPrice'>
                                        $N.A
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </div> */}
    
                    </Card>
                    </div>
    
                </Col>
    
    
            )
        })
    
        return (
            <div>
                <div className='main-wrapper-home-page'>
    
                    <Container>
                        <Row className='justify-content-md-center'>
                        <Col md='auto'>
                            <div className='sideBar'>
                                 <HomepageList/>
                            </div>
                        </Col>

                        <Col>
                            <img className='homeImage' src='https://www.autoimmuneinstitute.org/wp-content/uploads/2021/02/Resource-Page-Books-banner.png'/>

                        </Col>
             
                        </Row>
                        </Container>

                        <div className='booksDisplay'>
                     
                            <Container>  
                                <h1 style={{'marginBottom':'2%'}}>
                                    New Releases
                                </h1> 
                                
                                <Row>  
                                    {bookDisplay}
                                </Row>
                            </Container>

                        </div>

    

                        {/* <Container>
                        <Row className='justify-content-md-center'>
                        <Col md='auto'>
                            <div className='sideBar'>
                                    <HomepageList/>
                            </div>
                        </Col>
            
                        <Col>
                            <Container>    
                                <Row>  
                                    {bookDisplay}
                                </Row>
                            </Container>
                        </Col>
                        </Row>
                    </Container> */}
    
                </div>
            </div>   
    
        )
    }

    else
    {
        return (
            <div className='main-wrapper-home-page'>
                    
            </div>
        )
    }

}
