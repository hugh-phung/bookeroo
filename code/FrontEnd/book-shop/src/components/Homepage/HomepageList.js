import React from 'react'
import { ListGroup } from 'react-bootstrap'
import "./Homepage.css"
import { useHistory } from 'react-router'

export const HomepageList = () => {
    const history = useHistory();
    return (
        <div className='tableList'>
            <ListGroup>
                <ListGroup.Item variant='secondary'>Top 5 Sellers</ListGroup.Item>
                <ListGroup.Item onClick={()=>{history.push("/book/3")}} className='tableListItem'>Hunter X Hunter Vol. 1</ListGroup.Item>
                <ListGroup.Item onClick={()=>{history.push("/book/2")}} className='tableListItem'>Harry Potter and the Philosopher's Stone</ListGroup.Item>
                <ListGroup.Item onClick={()=>{history.push("/book/1")}} className='tableListItem'>Atomic Habbits</ListGroup.Item>
                <ListGroup.Item onClick={()=>{history.push("/book/4")}} className='tableListItem'>Charlie and the Chocolate Factory</ListGroup.Item>
                <ListGroup.Item onClick={()=>{history.push("/book/5")}} className='tableListItem'>No Longer Human</ListGroup.Item>
            </ListGroup>
        </div>

    )
}
