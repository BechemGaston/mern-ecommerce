import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
// import data from '../data';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Products from '../components/Products';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST': 
    return {...state, loading: true};
    case 'FETCH_SUCCESS': 
    return {...state, products: action.payload, loading: false};
    case 'FETCH_FAIL': 
    return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}




const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    products: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST'});
      try {
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message})
      }
      
      // setProducts(result.data)
    };
    fetchData();
  }, [])
  

  return (
    <div>
         <h1>Featured Products</h1>
        <div className="products">
        { loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <Row>
          {products?.map((product) => (
            <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug}>
                <Products product={product}  />
            </Col>
          ))}
          </Row>
        )}
        </div>
    </div>
  )
}

export default HomeScreen