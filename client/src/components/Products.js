import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';



const Products = (props) => {
    const {product} = props;
  return (
    <Card>
        <Link to={`/product/${product.slug}`}>
            <img src={product.image} alt={product.name} className="card-img-top" />
        </Link>
        <Card.Body>
            <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
            </Link>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <Card.Text className='price'>${product.price}</Card.Text>
            <Button 
              style={{ 
                backgroundColor: "#ffba08",
                color: "#03071e",
                border: "none",
                fontWeight: 400
                }}>Add to Cart</Button>
        </Card.Body>
  </Card>
  )
}


export default Products