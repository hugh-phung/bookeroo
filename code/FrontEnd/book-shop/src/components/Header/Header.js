import React from 'react'
import "./Header.css"
import {Button} from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useSessionUser } from '../../Hooks/useSessionUser'
import { useHistory } from 'react-router-dom'


export const Header = () => {
    const {loggedIn, logoutSessionUser} = useSessionUser();
    const {userType} = useSessionUser();
    const history = useHistory();

    // Log outs the user and reroutes to home page
    const logout = (event) => {
        event.preventDefault();

        logoutSessionUser();
        history.push("/");

    }

    const goToURL = (url) => {
        history.push(url);

    }

    return (
        <div>
        {
            loggedIn
            ?
            (<div className='header-style'>
                <div className='header-buttons'>
                <Container>
                    <div className='main-wrapper'>
                        <div style={{float:'left'}}>
                            <NavLink to = "/about-us">
                                <Button variant="secondary">About Us</Button>{' '}    
                            </NavLink>
                        </div>
                        <div className='padding' style={{float:'right', flexDirection:'row-reverse'}}>
                                <Button variant="secondary" onClick={logout} >Logout</Button>{' '}    
                        </div>
                        
                        <div className='padding' style={{float:'right', flexDirection:'row-reverse'}}>
                                <Button variant="secondary" onClick={()=> goToURL("/profile")} >My Profile</Button>{' '}    
                        </div>
                        {
                        userType.admin
                        ?
                        (
                            <div className = 'padding' style={{float:'right', flexDirection:'row-reverse'}}>
                                <NavLink to = "/management">
                                    <Button variant="secondary">Management</Button>{' '}    
                                </NavLink>
                            </div>
                        )
                        :
                            <div></div>
                        }   
              
                    </div>
                </Container>
                </div>
            </div>)
            :
            (
                <div className='header-style'>
                    <div className='header-buttons'>

                        <Container>
                            <div className = 'main-wrapper'>
                                <div  style={{float:'left'}}>
                                    <NavLink to = "/about-us">
                                        <Button variant="secondary">About Us</Button>{' '}    
                                    </NavLink>
                                </div>
                                <div className = 'padding' style={{float:'right', flexDirection:'row-reverse'}}>
                                    <NavLink to = "/login">
                                        <Button variant="secondary">Sign in</Button>{' '}    
                                    </NavLink>
                                </div>
                                <div className = 'padding' style={{float:'right', flexDirection:'row-reverse'}}>
                                    <NavLink to = "/register">
                                        <Button variant="secondary">Register</Button>{' '}
                                    </NavLink>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
                
            )
        }
        </div>


    )
}
