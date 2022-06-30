import React, { useContext, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import Checkout from '../components/Checkout';
import { Store } from '../Store';


const imgStyle = {
    height: '80px'
}


const PlaceOrderScreen = () => {
    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state; 

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );

    cart.shippingPrice = cart.items > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = async () => {}

        useEffect(() => {
            if(!cart.paymentMethod) {
                navigate('/payment')
            }
        }, [cart, navigate]);
    


  return (
    <div>
        <Checkout step1 step2 step3 step4></Checkout>
        <h1 className="mb-3">Preview Order</h1>
        <Row>
            <Col md={8}>
                <Card className="mb-3">
                    <Card.Body>
                        <Card.Title>Shipping</Card.Title>
                        <Card.Text>
                            <strong>Name: </strong>{cart.shippingAddress.fullName} <br />
                            <strong>Address: </strong>{cart.shippingAddress.address},
                            {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                            {cart.shippingAddress.country} 
                        </Card.Text>
                        <Link to="/shipping">Edit</Link>
                    </Card.Body>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method: </strong>{cart.paymentMethod}
                            </Card.Text>
                            <Link to="/payment">Edit</Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant="flush">
                                {cart.cartItems?.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row>
                                            <Col md={6}>
                                                <img src={item.image} alt={item.name}
                                                className="img-fluid rounded img-thumbnail"
                                                style={imgStyle}
                                                />{' '}
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link> 
                                            </Col>
                                            <Col md={3}>{item.quantity}</Col>
                                            <Col md={3}>${item.price}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Link to="/cart">Edit</Link>
                        </Card.Body>
                    </Card>
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <Card.Title>Order Summary</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>Order Total</strong>
                                    </Col>
                                    <Col>
                                        <stong>${cart.totalPrice.toFixed(2)}</stong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button
                                    variant="warning"
                                    type='button'
                                    onClick={placeOrderHandler}
                                    disabled={cart.cartItems.length === 0}
                                    >
                                    Place Order</Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen