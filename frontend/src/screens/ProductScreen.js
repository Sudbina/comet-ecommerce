import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Popover,
  OverlayTrigger,
  Toast,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const ProductScreen = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1);
  const [hasAddedToCart, displayCart] = useState(false);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const handleAddToCart = () => {
    console.log('Adding item to cart: ', { name: product.name, qty: quantity });
    // history.push(`/cart/${match.params.id}?qty=${quantity}`);
    dispatch(addToCart(match.params.id, quantity));
    displayCart(!hasAddedToCart);
  };

  return (
    <>
      <Link className='btn btn-light my-2' to='/'>
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2 style={{ fontWeight: '600' }}>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>${product.price}</h2>
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        {product.countInStock > 0
                          ? `${product.countInStock} in stock`
                          : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={quantity}
                            onChange={(evt) => setQuantity(evt.target.value)}
                          >
                            {/* map through the number of stock */}
                            {[...Array(product.countInStock).keys()].map(
                              (o) => (
                                <option key={o + 1} value={o + 1}>
                                  {o + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={handleAddToCart}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Toast
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              borderRadius: 5,
            }}
            delay={5000}
            onClose={() => displayCart(false)}
            show={hasAddedToCart}
            autohide
          >
            <Toast.Header style={{ borderRadius: 5 }}>
              <strong className='mr-auto'>Added to cart</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>
              <Row>
                <Col md={3} style={{ position: 'relative' }}>
                  <Image src={product.image} fluid />
                  <span
                    style={{
                      position: 'absolute',
                      left: 55,
                      top: 27,
                      fontWeight: 'bold',
                    }}
                  >
                    x{quantity}
                  </span>
                </Col>
                <Col>{product.name}</Col>
                <Col
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginRight: 5,
                  }}
                >
                  <Link to='/cart'>
                    <Button style={{ borderRadius: 2 }} size='sm'>
                      View
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Toast.Body>
          </Toast>
        </>
      )}
    </>
  );
};

export default ProductScreen;
