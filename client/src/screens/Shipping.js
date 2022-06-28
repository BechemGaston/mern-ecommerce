import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import Checkout from '../components/Checkout';

const Shipping = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { 
        userInfo,
        cart: { shippingAddress }
     } = state;
    
    const [fullname, setFullname] = useState( "");
    const [address, setAddress] = useState( "");
    const [city, setCity] = useState(  "");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");


    useEffect(() => {
        if(!userInfo) {
            navigate('/signin?redirect=/shipping')
        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullname,
                address,
                city,
                postalCode,
                country
            },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullname,
                address,
                city,
                postalCode,
                country
            })
        );
        navigate('/payment')
    }


  return (
      <div>
      <Checkout step1 step2></Checkout>
    <div className='container small-container' style={{ maxWidth: '600px' }}>
        <h1>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control 
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
             />
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
             />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
             />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
             />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
            <Form.Label>Country</Form.Label>
            <Form.Control
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
             />
        </Form.Group>
        <div className="mb-3">
            <Button variant="primary" type="submit">
                Continue
            </Button>
        </div>
        </Form>
    </div>
    </div>
  )
}

export default Shipping