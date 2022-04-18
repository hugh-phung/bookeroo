
import React from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import './Navbar.css';


export const NavigationBar = () => {

    return (
        <div className='categories'>
            <br></br>
            <Container>
                <Row>
                    <Col>
                        <NavLink to="/genre/fiction" style={{textDecoration:"none"}}>
                            <div className = 'navItems' >
                                Fiction
                            </div>
                            </NavLink>
                    </Col>

                    <Col>
                        <NavLink to="/genre/self-help" style={{textDecoration:"none"}}>
                            <div className = 'navItems'> 
                                Self Help
                            </div></NavLink>
                    </Col>

                    <Col>
                        <NavLink to="/genre/kids-teens" style={{textDecoration:"none"}}>
                            <div className = 'navItems'>
                                Kids & Teen
                            </div>
                            </NavLink>
                    </Col>

                    <Col>
                        <NavLink to="/genre/adult" style={{textDecoration:"none"}}>
                            <div className='navItems'>
                                Adult
                            </div></NavLink>
                    </Col>

                    <Col>
                        <NavLink to="/genre/school" style={{textDecoration:"none"}}>
                            <div className='navItems'>
                                School
                            </div></NavLink> 
                    </Col>
                </Row>



            </Container>

        </div>
    )
}
