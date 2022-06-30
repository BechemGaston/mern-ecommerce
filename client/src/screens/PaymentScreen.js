import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


import Checkout from '../components/Checkout';
import { Store } from '../Store';

const PaymentScreen = () => {
    const navigate = useNavigate();

  

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const {
        cart: { shippingAddress, paymentMethod },
    } = state;

    const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || 'Paypal')

    useEffect(() => {
        if(!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName});
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    }



  return (
    <div>
        <Checkout step1 step2 step3></Checkout>
        <div className="container small-container" style={{ maxWidth: '600px' }}>
            <h1 className="mb-3">Payment Method</h1>
            <Form onSubmit={submitHandler}>
              <div className="mb-3">
                  <Form.Check
                  type="radio"
                  id="Paypal"
                  label="Paypal"
                  value="Paypal"
                  checked={paymentMethodName === 'Paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                    />
              </div>

              <div className="mb-3">
                  <Form.Check
                  type="radio"
                  id="Stripe"
                  label="Stripe"
                  value="Stripe"
                  checked={paymentMethodName === 'Stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                    />
              </div>

              <div className='mb-3'>
                  <Button type='submit'>Continue</Button>
              </div>

            </Form>
        </div>
    </div>
  )
}

export default PaymentScreen