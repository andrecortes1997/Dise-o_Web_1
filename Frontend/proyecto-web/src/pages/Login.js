import E_Corp from 'assets/img/logo/E_Corp.PNG';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import { logIn } from '../services/Login';
import { Redirect } from 'react-router-dom';

const AuthForm = props => {
  const [isAuth, setIsAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ Username: '', Password: '' });

  const {
    showLogo,
    usernameLabel,
    usernameInputProps,
    passwordLabel,
    passwordInputProps,
    children,
    onLogoClick,
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleChange = async e => {
    const { name, value } = e.target;
    setLoginForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginErrors = (option, campo) => {
    option === 1
      ? Swal.fire(
          'Error de inicio de sesión',
          `El campo de ${campo} está vacio`,
          'error',
        )
      : Swal.fire(
          'Error de inicio de sesión',
          'Verifique sus credenciales',
          'error',
        );
  };

  const onLogIn = async () => {
    await logIn(loginForm)
      .then(response => {
        const { data, status } = response;
        if (status === 200) {
          const { Token, Nombre, Codigo } = data;
          const name = Nombre.split(' ');
          localStorage.setItem('token', Token);
          localStorage.setItem('name', name[0]);
          localStorage.setItem('Codigo', Codigo);
          setIsAuth(true);
        }
      })
      .catch(() => handleLoginErrors(2));
  };

  const handleLogIn = () => {
    const { Username, Password } = loginForm;

    !Username
      ? handleLoginErrors(1, 'nombre de usuario')
      : !Password
      ? handleLoginErrors(1, 'contraseña')
      : onLogIn();
  };

  return (
    <Row
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Col md={6} lg={4}>
        <Card body>
          <Form onSubmit={handleSubmit}>
            {showLogo && (
              <div className="text-center pb-4">
                <img
                  src={E_Corp}
                  className="rounded"
                  style={{ width: 60, height: 60, cursor: 'pointer' }}
                  alt="logo"
                  onClick={onLogoClick}
                />
              </div>
            )}

            <>
              <FormGroup>
                <Label for={usernameLabel}>{usernameLabel}</Label>
                <Input onChange={handleChange} {...usernameInputProps} />
              </FormGroup>
              <FormGroup>
                <Label for={passwordLabel}>{passwordLabel}</Label>
                <Input onChange={handleChange} {...passwordInputProps} />
              </FormGroup>
            </>

            {/*<FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup> 
        <hr />*/}

            <Button
              size="lg"
              className="bg-gradient-theme-left border-0"
              block
              onClick={handleLogIn}
            >
              Login
              {isAuth && <Redirect to="/" />}
            </Button>

            <div className="text-center pt-1">
              <h6>o</h6>
              <h6>
                <a href="/signup">
                  Registrarse
                </a>
              </h6>
            </div>

            {children}
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

AuthForm.propTypes = {
  showLogo: PropTypes.bool,
  onLogoClick: PropTypes.func,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Nombre de Usuario',
  usernameInputProps: {
    name: 'Username',
    type: 'text',
    placeholder: 'Ingrese su nombre de usuario',
  },
  passwordLabel: 'Contraseña',
  passwordInputProps: {
    name: 'Password',
    type: 'password',
    placeholder: 'Ingrese su contraseña',
  },

  onLogoClick: () => {},
};

export default AuthForm;
