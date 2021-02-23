import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log('DEBUG: ', cart, cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const emptyCart = () => {
    localStorage.clear();
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <Message>Cart is empty</Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>£{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={(evt) =>
                        dispatch(
                          addToCart(item.product, Number(evt.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((o) => (
                        <option key={o + 1} value={o + 1}>
                          {o + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='danger'
                      onClick={() => handleRemoveFromCart(item.product)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h2>
              £
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
