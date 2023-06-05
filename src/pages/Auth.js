import React, { useContext } from 'react';
import { Card, Form, Container, Button, Row } from 'react-bootstrap';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = location.pathname === LOGIN_ROUTE;

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 54 }}
    >
      <Card
        style={{ width: 600 }}
        className='p-5'
      >
        <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>

        <Form className='d-flex flex-column'>
          <Form.Control
            className='mt-3'
            placeholder='Введите ваш email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Form.Control
            className='mt-3'
            placeholder='Введите ваш пароль...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />

          {isLogin ? (
            <div className='mt-3'>
              Нет аккаунта?{' '}
              <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
            </div>
          ) : (
            <div className='mt-3'>
              Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
            </div>
          )}

          <Button
            className='mt-3 align-self-end'
            variant={'outline-success'}
            onClick={click}
          >
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
