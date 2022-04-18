import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container} from 'react-bootstrap'
import { useHistory } from 'react-router';
import '../Homepage/Homepage.css'

export const Search = () => {

    const history = useHistory();

    const {searchInput} = useParams();

    const[books, setBooks] = useState();
    const[searchType, setSearchType] = useState()


    const changeURL = (bookId) => {

        history.push("/book/"+ bookId)
    }

    const populateData = async () => 
    {

        try
        {
            const config = 
            {
                headers: {
                    // Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': '*'
                },
                // withCredentials:true
            }

            const searchRequest = {
                searchTerm:String(searchInput)
            }
            console.log("Search:", searchInput)
            const responseGetData = await axios.post('http://localhost:8081/api/books/searchbooks', searchRequest, config);
            console.log("Got search", responseGetData)

            return responseGetData.data;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    // Updates genre page by fetching books that belong to certain genres.
    // Search type is updated for display purposes.
    useEffect(() => {
        console.log("useEffect")
        async function fetchData() {
            console.log("fetch data")
            const bookData = await populateData();
            if (!bookData.results)
            {
                if (bookData.author)
                {
                    setSearchType("Authors")
                    setBooks(bookData.author)
                }

                if (bookData.title)
                {
                    setSearchType("Titles")
                    setBooks(bookData.title)
                }
                
                if (bookData.isbn)
                {
                    setSearchType("ISBN")

                    setBooks(bookData.isbn)
                }

                if (bookData.genre)
                {
                    setSearchType("Genres")

                    setBooks(bookData.genre)
                }


            }
            else
            {
                setBooks()
            }
        }

        fetchData();
    }, [searchInput])

    if (books)
    {
        const booksDisplay = books.map(book => 
            {
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
            }
        )

        return (
            <div className='main-wrapper-home-page'>
                <Container>
                    <Row>
                        <h1>
                            Search results for: "{searchInput}" found in {searchType}
                        </h1>
                    </Row>
                    <br/>
                    <Row>
                        {booksDisplay}
                    </Row>
                </Container>
            </div>
        )
    }
    else
    {
        return (
            <div>
                <Container>
                <h1>
                    No results found for '{searchInput}'
                </h1>
                <br/>

                </Container>
            </div>
        )
    }

}
