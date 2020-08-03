import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Cookies from 'js-cookie';
import imageService from '../services/image';
import { updateToken } from '../store/auth/actions';

const Login: React.FC<any> = ({ pageName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();

  const login = async (ev: any) => {
    ev.preventDefault();
    try {
      let resp;
      if (pageName === 'Login') {
        const { data } = await imageService.post('/authenticate', {
          email,
          password
        });

        resp = data;
      } else {
        const { data } = await imageService.post('/register', {
          email,
          password
        });

        resp = data;
      }

      dispatch(updateToken(resp.token));
      Cookies.set('userToken', resp.token);
      history.push('/home');
    } catch ({ response }) {
      setError(response.data.error.user_authentication || response.data.error);
    }
  }

  return (
    <Container className="mt-4">
      <h2>{pageName}</h2>
      {
        errorMessage &&
        <Alert variant="danger">{errorMessage}</Alert>
      }
      <Form onSubmit={login}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            value={email} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            value={password} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
