import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from 'react-router-dom';

const SigninScreen = () => {
    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : "/";



  return (
    <Container className='small-container' style={{ maxWidth: '600px' }}>
      <h1 className='my-3'>Sign In</h1>
      <Form>
          <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required />
          </Form.Group>
          <div className='mb-3'>
              <Button type="submit" variant='warning'>Sign In</Button>
          </div>
          <div className='mb-3'>
              New Customer ?{" "}
              <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          </div>
      </Form>
    </Container>
  )
}

export default SigninScreen