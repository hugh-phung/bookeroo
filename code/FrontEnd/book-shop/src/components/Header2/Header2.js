import React from 'react'
import {Button, Container, Row, Col, Image} from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useHistory} from 'react-router'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./Header2.css"

export const Header2 = () => {
    const history = useHistory();
    const [searchInput, setSearch] = useState("");
    const changeURL = () => {
        if (searchInput !== "")
        {
            history.push('/search/' + searchInput)
        }
    }
    return (
        <div className='header2'>
            <Container>
                <Row>
                    <Col md={4}>
                        <NavLink to = '/' style={{textDecoration:"none"}}>                        
                        <h1 className='logo'>
                            BOOKEROO
                        </h1>
                        </NavLink>
                    </Col>


                    <Col md={{span:6, offset:2}}>

                        <br/>


                            <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                                value = {searchInput}
                                onChange={event=>setSearch(event.target.value)}
                                onKeyPress={event=> {
                                    if (event.key == "Enter")
                                    {
                                        changeURL()
                                    }
                                }}
                            />
                            <Button onClick={changeURL} variant="outline-success">Search</Button>

                            <div className='cart'>
                                <NavLink to='/cart'>
                                    <Button style={{background:'white', borderColor:'white', maxHeight:'50px', alignSelf:'center'}}> 
                                        <img style={{maxHeight:'50px'}}src='https://i.pinimg.com/originals/15/4f/df/154fdf2f2759676a96e9aed653082276.png'/>
                                    </Button>
                                </NavLink>
                            </div>
                            </Form>

                        
                    </Col>      
              
                </Row>
               
            </Container>

           
        </div>
    )
}
