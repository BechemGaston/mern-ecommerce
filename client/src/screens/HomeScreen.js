import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
// import data from '../data';
import axios from 'axios';


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
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    produts: [],
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
        {
          products?.map((product) => (
            <div className="product" key={product.slug}>
              <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
                </Link>
                <p className='price'>${product.price}</p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))
        }
        </div>
    </div>
  )
}

export default HomeScreen