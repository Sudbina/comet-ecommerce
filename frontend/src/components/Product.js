import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text className='cashFontLarge' as='h4'>
          {product.onSale ? (
            <>
              <span
                style={{
                  color: 'rgba(0,0,0,0.5)',
                  fontWeight: 400,
                  textDecoration: 'line-through',
                }}
              >
                £{product.price}
              </span>
              <span style={{ color: 'red', fontWeight: 700, marginLeft: 10 }}>
                £{product.salePrice}
              </span>
            </>
          ) : (
            `£${product.price}`
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
