import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react'
import { data } from '../../data/Data'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Card, Col, Row} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import '../Homepage/Homepage.css'


export const Genre = () => {

    const history = useHistory();
    const { genreParam } = useParams();
    const [books, setBooks] = useState();


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
            const genreRequest = {
                searchTerm:String(genreParam)
            }
            const responseGetData = await axios.post('http://localhost:8081/api/books/booksbygenre', genreRequest, config);
            console.log("Get genre", responseGetData)
            return responseGetData.data;
        }

        catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("use effect")
        async function fetchData() {
            const bookData = await populateData();
            // If there are actually books set it into book state
            if(!bookData.results){
                setBooks(bookData);
            } else {
                setBooks()
            }
        }
        fetchData();
    }, [genreParam])


    const changeURL = (bookId) => {

        history.push("/book/"+ bookId)
    }

    if (books)
    {
        const booksDisplay = books.map(book => {
            return (
                <Col md='auto'>
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
                                            ${book.price}
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </div> */}

                        </Card>
                </Col>
            )
        })
    
        return (
            <div className='main-wrapper-home-page'> 
                <Container>
                    <div>
                    <Row>
                        {booksDisplay}
                    </Row>
                    </div>
                </Container>
            </div>
        )
        
    }
   
    else
    {
        return (
            <div className='main-wrapper-home-page'>
                <Container>
                    <h1>
                        No books for this category.
                    </h1>
                </Container>
            </div>
        )
    }
}
