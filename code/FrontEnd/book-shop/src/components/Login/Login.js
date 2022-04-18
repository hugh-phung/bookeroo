import axios from 'axios';
import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useForm } from '../../Hooks/useForm'
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { SESSION_USER } from '../constants';
import jwt_decode from 'jwt-decode';
import { useSessionUser } from '../../Hooks/useSessionUser';
import { useHistory } from 'react-router-dom';
import './Login.css'

export const Login = () => {

    const history = useHistory();
    const {loginSessionUser} = useSessionUser();
    const {userType} = useSessionUser();
    const {fields, setFields, handleInputChange} = useForm({});
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        success: false,
        failure: false,
        message: ""
    })

    // Submits login form.
    // Decodes token and stores in local storage
    const submit = async (event) => {
        event.preventDefault()


        const data = {
            username: String(fields.username),
            password: String(fields.password)
        }
        console.log(data)



        try {
            const config = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                withCredential: true
            }
            const response = await axios.post('http://localhost:8080/api/users/login', data, config);
            // console.log(response.data.token);

            if (response.status === 200)
            {
                setShow(true);
                setMessage({
                    success:true,
                    failure:false,
                    message: "Login Successful"
                });

                const decoded = jwt_decode(response.data.token);

                loginSessionUser(JSON.stringify(decoded));
                loginSessionUser(decoded);

                console.log(JSON.stringify(decoded));

                localStorage.setItem(SESSION_USER, JSON.stringify(decoded));

                console.log(JSON.parse(localStorage.getItem(SESSION_USER)));

                setTimeout(() => {history.push("/")}, 3000)
            }
        }

        catch (error) {
            console.log(error);
            
            setShow(true);
            setMessage({
                success:false,
                failure:true,
                message: "Login Unsuccessful"
            });

        }

    }
    return (
        <div className='main-wrapper-login'>
            <Container>
                {
                    show === true && message.failure
                    ?
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>{message.message}</Alert.Heading>
                    <p>
                        Username or Password is incorrect.
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
                        You will be redirected shortly.
                    </p>
                    </Alert>
                    :
                    <></>
                }
            <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="admin@gmail.com" name = 'username' value = {fields.username} onChange={handleInputChange}/>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password" name='password' value={fields.password} onChange={handleInputChange}/>
                    </Form.Group>
                              

                    <br></br>

                    <Button variant="primary" type="submit" onClick={submit}>
                        Login
                    </Button>
            </Form>
            </Container>
        </div>
    )
}
