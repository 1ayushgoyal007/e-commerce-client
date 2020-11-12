import React,{ useEffect } from 'react';
import {   Button , Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {


    const floorDigit = (num) => {
        return ( Math.round(num*100) / 100 ).toFixed(2);
    }

    const dispatch = useDispatch();


    //Calculate All Prices
    const cart = useSelector(state=> state.cart)
    
    cart.itemsPrice =  floorDigit( cart.cartItems.reduce((acc, item)=> acc + item.price* item.qty ,0) );
    cart.shippingPrice = floorDigit( cart.itemsPrice > 100 ? 0 : 20 );
    cart.taxPrice = floorDigit( Number((0.18 * cart.itemsPrice).toFixed(2) ) );
    cart.totalPrice= (parseFloat(cart.itemsPrice) + parseFloat(cart.shippingPrice) + parseFloat(cart.taxPrice)).toFixed(2);
    

    const orderCreate = useSelector(state=> state.orderCreate);
    const {order, success, error} = orderCreate;

    useEffect(()=>{
        if(success){
            console.log('this was success');
            history.push(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    },[history, success]);
    
    const placeOrderHandler = ( ) => {
        console.log('place Order Processing');
        dispatch( createOrder({ 
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice

         }) )
    }

    return <div>
        <CheckoutSteps step1 step2 step3 step4  />
        <Row>
            <Col md={8} >
                <ListGroup variant="flush" >
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {`${cart.shippingAddress.address} ${cart.shippingAddress.city} ${cart.shippingAddress.postalCode} ${cart.shippingAddress.country}`}

                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong> {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order items</h2>
                        { cart.cartItems.length===0 ? <Message variant="danger" >Cart is Empty</Message>
                        : <ListGroup variant="flush" >
                            { cart.cartItems.map((item, index)=>{
                                return <ListGroup.Item key={index} >
                                    <Row>
                                        <Col md={1}>
                                            { item.image ?<Image src={item.image} alt={item.name} fluid  />: null  }
                                            
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4} >
                                            {item.qty } X ${item.price} = ${item.qty * item.price}
                                        </Col>

                                    </Row>
                                </ListGroup.Item>
                            }) }
                        </ListGroup> }
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Price Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>GST </Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        { error ? <ListGroup.Item>
                        <Message variant="danger" >{error}</Message>
                        </ListGroup.Item>:null }
                        <ListGroup.Item>
                            <Button type="button" 
                            className="btn-block" 
                            disabled={cart.cartItems===0} 
                            onClick={placeOrderHandler} >
                                Place Order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
}

export default PlaceOrderScreen;