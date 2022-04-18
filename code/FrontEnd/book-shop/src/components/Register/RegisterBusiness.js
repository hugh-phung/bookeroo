import React from 'react'
import { Form, Button, Container, Alert} from 'react-bootstrap'
import { useForm } from '../../Hooks/useForm'
import { useState } from 'react'
import { NavLink } from 'react-router-dom';

const axios = require('axios');


export const RegisterBusiness = () => {
    const passwordLength = 6;
    const phoneLength = 10;
    const {fields, setFields, handleInputChange} = useForm({});
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        success:false,  
        failure:false,
        message:""
    });

    const submit =  async (event) => {
        event.preventDefault()

        if (fields.password)
        {
            if (fields.password !== fields.confirmPassword)
            {
                setShow(true);
    
                setMessage({
                    success: false,
                    failure: true,
                    message: "Passwords do not match!"
                })
    
                return;
            }
    
            if ((fields.password.length < passwordLength) || (fields.confirmPassword.length < passwordLength))
            {
                setShow(true);
    
                setMessage({
                    success: false,
                    failure: true,
                    message: "Passwords is not long enough!"
                })
    
                return;
            }
        }

        if (fields.phone)
        {
            if (fields.phone.length !== phoneLength || String(fields.phone).charAt(0) !== '0')
            {
                setShow(true);
                setMessage({
                    success: false,
                    failure: true,
                    message: "Phone number invalid"
                })
    
                return;
            }
        }
        
        const data = {
            username: String(fields.username),
            firstName: String(fields.firstName),
            lastName: String(fields.lastName),
            address: String(fields.address),
            phone: String(fields.phone),
            userType: "business",
            abn: String(fields.abn),
            businessName: String(fields.businessName),
            password: String(fields.password),
            confirmPassword: String(fields.confirmPassword)
        }

        try {
            const config = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                withCredential: true
            }

            // Post URL form here
            const response = await axios.post('http://localhost:8080/api/users/register', data, config);
            if(response.status === 201){
                setFields( {
                    username: "",
                    firstName: "",
                    lastName: "",
                    address: "",
                    phone: "",
                    abn: "",
                    businessName: "",
                    password: "",
                    confirmPassword: ""
                })

                setShow(true);

                setMessage({
                    success: true,
                    failure: false,
                    message: "Account creation success"
                });
            }

        }
        catch (error) {
            console.log(error)
            setShow(true);
            setMessage({
                success: false,
                failure: true,
                message: "Account creation failure"
            });
        }



    }
        


    return (
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
                    Account successfully created!
                    </p>
                    </Alert>
                    :
                <></>
                }

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="john.doe@gmail.com" name = 'username' value = {fields.username} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Cloud" name = 'firstName' value = {fields.firstName} onChange= {handleInputChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Strife" name = 'lastName' value = {fields.lastName} onChange= {handleInputChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="7 Gainsborough Court" name = 'address' value = {fields.address} onChange= {handleInputChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" placeholder="0438262941" name = 'phone' value = {fields.phone} onChange= {handleInputChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formABN">
                        <Form.Label>ABN</Form.Label>
                        <Form.Control type="text" placeholder="51824753556 (11 digit number)" name = 'abn' value = {fields.abn} onChange= {handleInputChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBusinessName">
                        <Form.Label>Business Name</Form.Label>
                        <Form.Control type="text" placeholder="Barret's Books" name = 'businessName' value = {fields.businessName} onChange= {handleInputChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' value={fields.password} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='confirmPassword' value={fields.confirmPassword} onChange={handleInputChange}/>
                    </Form.Group>
          
                    <br></br>
                    <Button variant="primary" type="submit" onClick={submit}>
                        Submit
                    </Button>
                    <br></br>
                </Form>
            </Container>
            
        </div>
    )
}
