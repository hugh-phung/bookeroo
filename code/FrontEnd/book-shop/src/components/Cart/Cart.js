import React from 'react'
import './Cart.css'
import { Container, Row, Modal, Button, Table} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { useSessionUser } from '../../Hooks/useSessionUser'
import { useEffect, useState } from 'react'
import {PayPal} from './PayPal'
import { Success } from './Success'
import { useHistory } from 'react-router'

export const Cart = () => {
    const history = useHistory();
    const {sessionUser} = useSessionUser();
    const [cartData, setCartData] = useState();
    const [cartDataLoaded, setCartDataLoaded] = useState(false);
    const [allAvailable, setAllAvailable] = useState(true);
    const [total, setTotal] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false); 

    // Modal
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        history.push("/")       

    }
    const handleCloseOk = () => {
        setShow(false)
        history.push("/login")       
    }

    
    // Clears entire cart
    const clearCart = async () =>
    {
        try{
            const config = {
                headers: {
                    Accept:'application/json',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                },
            }

            const data = {
                userId: sessionUser.id
            }
    
            const response = await axios.post('http://localhost:8084/api/carts/clearcart', data, config)
            console.log(response);
            reloadPage();
        }
        catch (err)
        {
            console.log(err)
        }
  
    }

    const reloadPage = async () =>
    {
        setPaymentSuccess(true);

    }

    // Deletes item from cart when user clicks the delete button beside item
    const deleteCartItem = async (cartData, item) =>
    {
        try
        {
            const config = {
                headers: {
                    Accept:'application/json',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                },
            }

            const data = {
                listingId:item.listingId,
                userId:cartData.userId
            }

            const response = await axios.post("http://localhost:8084/api/carts/removeitem", data, config);
           
            console.log(response);
            window.location.reload(false);

        }
        catch (err)
        {
            console.log(err)
        }
    }

    // API call to checkout the cart
    const checkout = async (sessionUser, cartData) =>
    {
        console.log('checkout entered');
        // Log transaction data
        try {
            const config = {
                headers: {
                    Accept:'application/json',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                },
            }

            const data = {
                userId: sessionUser.id,
                username: sessionUser.username
            }
            const response = await axios.post('http://localhost:8084/api/carts/checkout', data, config);
            console.log("Checked out", response)
        }
        catch (error)
        {
            console.log(error)
        }
    }

    // Method to mark all items in cart as sold
    const markItemsAsSold = async (cartData) => 
    {

        // Marks items in the cart being checkout as 'sold'
        for (const listing of cartData.itemsList)
        {
            try{
                const config = {
                    headers: {
                        Accept:'application/json',
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Origin':'*',
                    },
                }
    
                const data = {
                    id: listing.listingId
                }
        
                const response = await axios.post('http://localhost:8082/api/listings/marklistingassold', data, config)
                console.log(response);     
            }
            catch (err)
            {
                console.log(err)
            }
        }

    }

    // Checks whether items are available
    const checkAllItemsSold = ()=> {
        if (cartData)
        {
            if (cartData.itemsList)
            {
                for (const itemList of cartData.itemsList)
                {
                    if (itemList.sold)
                    {
                        setAllAvailable(false);
                    }
                }
            }
        }
      
    }

    // Grabs cart data 
    const fetchCart = async ()=> 
    {
        try
        {
            const config = {
                headers: {
                    Accept:'application/json',
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                },
            }

            const data = {
                userId:parseInt(sessionUser.id)
            }

            const response = await axios.post('http://localhost:8084/api/carts/getcart', data, config);

            console.log(response);

            return response.data;
        }
        catch (error)
        {
            console.log(error);
        }
    }

    // Ensures cart is always up-to-date
    useEffect(() => {
        async function fetchData(){
            if (cartDataLoaded === false)
            {
                const cartDataFetch = await fetchCart();
                setCartData(cartDataFetch);
                setCartDataLoaded(true);
            }
        }
        fetchData();
        calculateTotal();
        checkAllItemsSold();

    }, [cartDataLoaded, sessionUser, cartData])


    // Calculates total cost of all items
    const calculateTotal = () =>
    {
        var totalCost = 0;
        if (cartData)
        {
            if (cartData.itemsList)
            {
                for (const itemList of cartData.itemsList)
                {
                    totalCost += itemList.price;
                }  
            }
        }
        
        totalCost = totalCost.toFixed(2);
        setTotal(totalCost);
    }

  
    if (sessionUser.username !== "")
    {
        if (cartData)
        {
            if (cartData.itemsList.length !== 0)
            {
                const cartItem = cartData.itemsList.map(item => {
                    return (
                        <>
                        {
                        item.sold
                        ?
                        (
                        <tr style={{'backgroundColor':'#FE7E62'}}>
                            <td>
                                <img src={item.imgURL} style={{'maxHeight':'15vh', 'maxWidth':'100%'}}/>
                            </td>
                            <td>{item.title}</td>
                            <td>{item.listingId}</td>
                            <td>{item.seller}</td>
                            <td>{item.price}</td>
                            <td >
                                <br/>
                                
                                <button onClick={()=> {deleteCartItem(cartData, item)}} className='tableButtonCheckout'>
                                    <img src='http://cdn.onlinewebfonts.com/svg/img_439489.png'/>
                                </button>
                            </td>
                        </tr>
                        )
                        :
                        (
                        <tr>
                            <td style={{'maxWidth':'3rem'}}>
                                <img src={item.imgURL} style={{'maxHeight':'15vh', 'maxWidth':'100%'}}/>
                            </td>
                            <td>{item.title}</td>
                            <td>{item.listingId}</td>
                            <td>{item.seller}</td>
                            <td>{item.price}</td>
                            <td style={{'width':'50'}}>
                                <br/>
                                
                                <button onClick={()=> {deleteCartItem(cartData, item)}} className='tableButtonCheckout'>
                                    <img src='http://cdn.onlinewebfonts.com/svg/img_439489.png'/>
                                </button>
                            </td>
                        </tr>
                        )
                        }
                        </>
                    )
                })
                return (
                    <div>
    
                        {
                            paymentSuccess
                            ?
                                <Success />
                            :
                            (<div></div>)
                        }
    
                    <div className='main-wrapper-cart-page'>
                        <Container>
                            <h1 style={{'marginBottom':'3%'}}>
                                My Cart
                            </h1>
                            <Row>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Title</th>
                                            <th>Listing ID</th>
                                            <th>Seller</th>
                                            <th>Price</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItem}
                                    </tbody>
                                </Table>
    
                                {/* <Col md={7}>
                                    {cartItem}
                                </Col>
    
                                <Col md={{span:3, offset:2}}>
                                    <div>
    
                                    </div>
                                </Col> */}
    
                            </Row>
                            <NavLink to='/'>
                                <Button size='lg' style={{'marginTop':'2%', 'backgroundColor':'cadetblue', 'borderColor':'cadetblue'}}>
                                    Continue Shopping
                                </Button>
                            </NavLink>
                            <div className='checkOutBox'>
                                <div className='checkOutContent'>
                                    <strong>
                                        <span style={{'display':'flex', 'float':'left'}}>
                                            Total: 
                                            </span>
                                        <span style={{'display':'flex', 'float':'right'}}>
                                            ${total}
                                        </span>
                                    </strong>
                                    <br/>
    
                                    {
                                        !allAvailable
                                        ?
                                        (
                                            <div className='errorMsg'>
                                                Cart items already sold!
                                            </div>
                                        )
                                        :
                                        (
                                            <div style={{'marginTop':'5%'}} >
                                            <PayPal sessionUser={sessionUser} cartData={cartData} markItemsAsSold={markItemsAsSold} checkout={checkout} clearCart={clearCart} calculatedPrice = {total} />
                                            </div>
                                        )
                                    }
                           
                                </div>                         
                            </div>
    
      
                     
                        </Container>
                        </div>
                    </div>
                )
            }
    
            else
            {
                console.log("payment success", paymentSuccess)
    
                return (
                    <div>
                        {
                            paymentSuccess
                            ?
                            (
                                <Success />
    
                            )
                            :
                            (<div></div>)
                        }
    
                    <div className='main-wrapper-cart-page'>
                        <Container>
                            <h1>
                                My Cart
                            </h1>
                            <div style={{'marginTop':'2%', 'fontSize':'20px'}}>
                                Your cart is empty.
                            </div>
    
                            <NavLink to='/'>
                                <Button size='lg' style={{'marginTop':'2%', 'backgroundColor':'cadetblue', 'borderColor':'cadetblue'}}>
                                    Continue Shopping
                                </Button>
                            </NavLink>
                        </Container>
                    </div>
                    </div>
    
                )
            }
        }
        else
        {
            return (   
                <div className='main-wrapper-cart-page'>
                    <Container>
                        <h1>
                            My Cart
                        </h1>
                        <body style={{'marginTop':'2%', 'fontSize':'20px'}}>
                            Your cart is empty.
                        </body>
                        <NavLink to='/'>
                                <Button size='lg' style={{'marginTop':'2%', 'backgroundColor':'cadetblue', 'borderColor':'cadetblue'}}>
                                    Continue Shopping
                                </Button>
                            </NavLink>
                    </Container>
                </div>
            )
        }
    }
    else
    {
        return (
            <div className='main-wrapper-cart-page'>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Not Logged in!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please login to access your cart</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseOk}>
                        Login
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
   

}
