import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Tab, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdate = useSelector((state) => state.userUpdate);

  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;
  const { success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const handleUpdate = (evt) => {
    evt.preventDefault();
    if (password !== confirmedPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      setShow(true);
    }
  };

  if (show) {
    setTimeout(() => {
      setShow(false);
    }, 6000);
  }

  return (
    <Col>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
          <Row>
            <Col sm={3}>
              <Nav variant='pills' className='flex-column'>
                <Nav.Item>
                  <Nav.Link eventKey='first'>Update Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='second'>My Orders</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey='first'>
                  <Message variant='success' show={show}>
                    Profile Updated
                  </Message>
                  <h2>Update Profile</h2>
                  <Form onSubmit={handleUpdate}>
                    <Form.Group controlId='name'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(evt) => setName(evt.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='Password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(evt) => setPassword(evt.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmedPassword}
                        onChange={(evt) =>
                          setConfirmedPassword(evt.target.value)
                        }
                      ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                      Update Profile
                    </Button>
                  </Form>
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  <h2>Previous Orders</h2>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </Col>
  );
};

export default ProfileScreen;
