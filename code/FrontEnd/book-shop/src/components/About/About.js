import React from 'react'
import { Container } from 'react-bootstrap'
import "./About.css"

export const About = () => {
    return (
        <div className='main-wrapper-about'>
            <Container>
                <h1>
                    Software Engineering: Process and Tools
                </h1>
                <h1>
                    2021 Semester 2 Major Assignment
                </h1>

                <h1>
                    Group Name: SEPT Group 6
                </h1>

                <div className='aboutBody'>
                    BOOKEROO is a platform for purchasing and selling your favourite books!               
                </div>

                <div className='aboutTeam'>
                        
                    Group Members:
                    <pre>
                        <ul>
                            <li> Hugh Phung    | 3842508 | Front-End Developer, Documentation </li>
                            <li> Reylan Gill   | 3285137 | Back-End Developer, Docker, AWS, Documentation</li> 
                            <li> Fraser Green  | 3787186 | Circle Ci, Docker, Documentation</li>
                            <li> Sam Te        | 3199556 | Entity Relationship Diagram Designer, Docker, Documentation</li> 
                        </ul>
                    </pre>
                </div>
            </Container>
        </div>
    )
}
