import React from 'react'
import { useForm } from '../../Hooks/useForm'
import { useState } from 'react';
import { Form, Container, Button, Alert, Row, FloatingLabel} from 'react-bootstrap'
import { useHistory, NavLink} from 'react-router-dom';
import './ManageBooks.css'
// import './Management/ManageBooks.css'

const axios = require('axios');

export const AddBooks = () => {

    const history = useHistory();
    const maxWords = 35;

    const {fields, setFields, handleInputChange} = useForm({});
    const [genreValue, setGenre] = useState('Fiction');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        success:false,
        failure:false,
        message:""
    });

    function isEmptyOrSpaces(str){
        return str === null;
    };

    const submit = async (event) => {
        if (isEmptyOrSpaces(fields.isbn) || isEmptyOrSpaces(fields.name) || isEmptyOrSpaces(fields.author) || isEmptyOrSpaces(fields.genre))
        {
            setShow(true);

            setMessage({
                    success:false,
                    failure:true,
                    message:"Fields not filled in."
                });
            return;
        }

        

        var calculateDescriptionLength = () =>
        {
            var string = document.getElementById('description').value;
            var length = string.split(/[^\s]+/).length - 1;
            return length;
        }

        if (calculateDescriptionLength() > maxWords)
        {
            setShow(true);
            
            setMessage({
                success:false,
                failure:true,
                message:"Description too long!"
            })

            return;
        }
        const data = {
            isbn: String(fields.isbn),
            title: String(fields.title),
            author: String(fields.author),
            genre: String(genreValue),
            description: String(fields.description),
            imgURL: String(fields.imgURL),
            price: String(fields.price)
        };

        try {

        
            const config = 
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    withCredential: true
                 };

            const response = await axios.post("http://localhost:8081/api/books/addbook", data, config);

            if (response.status === 201)
            {
                console.log(response);
                setFields({
                    isbn:"",
                    title:"",
                    author:"",
                    genre:"",
                    description:"",
                    imgURL:"",
                    price:""
                })

                setShow(true);

                setMessage({
                    success: true,
                    failer: false,
                    message: "Book Creation Success"
                });
            }
        }

        catch (error) {
            console.log(error);
            console.log(data);
            setShow(true);
            setMessage({
                success: false,
                failure: true,
                message: "Book Creation Failure"
            });
        };
    }
    return (
        <div>
            <div>
            <Container>
                {
                    show === true && message.failure
                    ?
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>{message.message}</Alert.Heading>
                    <p>
                    Fields are incorrect
                    </p>
                    </Alert>
                    :
                <></>
                }

                {
                    show === true && message.success
                    ?
                    <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>{message.message}</Alert.Heading>
                    <p>
                    Book successfully created!
                    </p>
                    </Alert>
                    :
                <></>
                }
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control placeholder="The Hungry Caterpillar" name = 'title' value={fields.title} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control placeholder="1234567890" name='isbn' value={fields.isbn} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control placeholder="Cloud Strife" name='author' value={fields.author} onChange={handleInputChange} />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control placeholder="Comedy" name='genre' value={fields.genre} onChange={handleInputChange}/>
                </Form.Group> */}
                <Form.Group>
                    <Form.Label>Genre</Form.Label>

                    <Form.Label
                        className="me-sm-2"
                        htmlFor="inlineFormCustomSelect"
                        visuallyHidden
                        >
                        Select Genre
                    </Form.Label>
                    <Form.Control as ="select" name='genre' value={genreValue} onChange={e=> {
                        setGenre(e.target.value);
                        console.log(e.target.value);
                    }}>
                        <option value="fiction">Fiction</option>
                        <option value="self-help">Self-Help</option>
                        <option value="kids-teens">Kids & Teen</option>
                        <option value="adult">Adult</option>
                        <option value="school">School</option>
                    </Form.Control>
                    <br></br>

                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                        <FloatingLabel controlId="floatingTextarea2" label="Enter book synopsis, NO GREATER THAN 35 WORDS." style={{color:'grey'}}>
                            <Form.Control id='description' name='description' value={fields.description} onChange={handleInputChange}
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control placeholder="Image URL" name='imgURL' value={fields.imgURL} onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control placeholder="14.99" name='price' value={fields.price} onChange={handleInputChange}/>
                </Form.Group>
            </Form>


            </Container>

            </div>
            <div>
                <Container>
                    <Row>
                    <div className='backSubmit'>
                        <div className='buttonPadding'>
                            <NavLink to='/management/books/'>
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
