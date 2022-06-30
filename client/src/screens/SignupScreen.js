import React, { useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

const SignupScreen = () => {
  const navigate = useNavigate()
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conFirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;


    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : "/";


    const submitHandler = async (e) => {
      e.preventDefault();
      if( password !== conFirmPassword) {
          toast.error('passwords do not match')
          return;
      }
      try {
        const { data } = await axios.post("/api/users/signup", {
          name,
          email,
          password,
        });
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));

        navigate(redirect || '/');
      } catch (error) {
        toast.error(getError(error))
      }
    }

    useEffect(() => {
      if (userInfo) {
        navigate(redirect)
      }
    }, [navigate, redirect, userInfo])


  return (
    <Container className='small-container' style={{ maxWidth: '600px' }}>
      <h1 className='my-3'>Sign Up</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" required onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>


          <div className='mb-3'>
              <Button type="submit" variant='warning'>Sign Up</Button>
          </div>
          <div className='mb-3'>
              Already have an account ?{" "}
              <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
      </Form>
    </Container>
  )
}

export default SignupScreen;