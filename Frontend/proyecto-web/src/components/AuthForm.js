import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import { logIn } from '../services/Login';
import { Redirect } from 'react-router-dom';
import { register } from '../services/Register';

const AuthForm = props => {
  const emptyForm = {
    Identificacion: '',
    Nombre: '',
    Username: '',
    Email: '',
    Password: '',
    FechaNacimiento: '',
    Estado: 'A',
  };

  const [isAuth, setIsAuth] = useState(false);
  const [loginForm, setLoginForm] = useState({ Username: '', Password: '' });
  const [registerForm, setRegisterForm] = useState(emptyForm);
  const [isLogin, setIsLogin] = useState(props.authState === STATE_LOGIN);
  const [isSignUp, setIsSignUp] = useState(props.authState === STATE_SIGNUP);

  const {
    showLogo,
    usernameLabel,
    usernameInputProps,
    passwordLabel,
    passwordInputProps,
    confirmPasswordLabel,
    confirmPasswordInputProps,
    children,
    onLogoClick,
    identificacionLabel,
    identificacionInputProps,
    nombreLabel,
    nombreInputProps,
    emailLabel,
    emailInputProps,
    fechaNacimientoLabel,
    fechaNacimientoInputProps,
  } = props;

  const changeAuthState = authState => event => {
    event.preventDefault();

    props.onChangeAuthState(authState);
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const renderButtonText = () => {
    const { buttonText } = props;

    if (!buttonText && isLogin) {
      return 'Login';
    }

    if (!buttonText && isSignUp) {
      return 'Registrarse';
    }

    return buttonText;
  };

  const handleLoginChange = async e => {
    const { name, value } = e.target;
    setLoginForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterChange = async e => {
    const { name, value } = e.target;
    setRegisterForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
    console.log(registerForm);
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

  const handleRegisterErrors = (option, campo) => {
    option === 1
      ? Swal.fire(
          'Error de Registro',
          `El campo de ${campo} está vacio`,
          'error',
        )
      : option === 2
      ? Swal.fire(
          'Error de Registro',
          'Ingrese un campo de email valido',
          'error',
        )
      : option === 3
      ? Swal.fire(
          'Error de registro',
          'Revise sus credenciales o intente más tarde',
          'error',
        )
      : Swal.fire(
          'Registro completado exitosamente',
          'Felicitaciones, inicie sesión',
          'success',
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

  const onRegister = async () => {
    await register(registerForm)
      .then(status => {
        if (status === 200) {
          props.history.push('/login');
        }
        handleRegisterErrors(4);
      })
      .catch(e => {
        console.log(e);
        handleRegisterErrors(3);
      });
  };

  const handleRegister = () => {
    const {
      Identificacion,
      Nombre,
      Username,
      Email,
      Password,
      FechaNacimiento,
    } = registerForm;

    const regex = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    !Identificacion
      ? handleRegisterErrors(1, 'identificación')
      : !Nombre
      ? handleRegisterErrors(1, 'nombre completo')
      : !Username
      ? handleRegisterErrors(1, 'nombre de usuario')
      : !Email
      ? handleRegisterErrors(1, 'email')
      : !regex.test(Email)
      ? handleRegisterErrors(2)
      : !Password
      ? handleRegisterErrors(1, 'contraseña')
      : !FechaNacimiento
      ? handleRegisterErrors(1, 'fecha de nacimiento')
      : onRegister();
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showLogo && (
        <div className="text-center pb-4">
          <img
            src={logo200Image}
            className="rounded"
            style={{ width: 60, height: 60, cursor: 'pointer' }}
            alt="logo"
            onClick={onLogoClick}
          />
        </div>
      )}
      {isSignUp ? (
        <>
          <FormGroup>
            <Label for={usernameLabel}>{usernameLabel}</Label>
            <Input onChange={handleRegisterChange} {...usernameInputProps} />
          </FormGroup>
          <FormGroup>
            <Label for={passwordLabel}>{passwordLabel}</Label>
            <Input onChange={handleRegisterChange} {...passwordInputProps} />
          </FormGroup>
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input
              onChange={handleRegisterChange}
              {...confirmPasswordInputProps}
            />
          </FormGroup>
          <FormGroup>
            <Label for={identificacionLabel}>{identificacionLabel}</Label>
            <Input
              onChange={handleRegisterChange}
              {...identificacionInputProps}
            />
          </FormGroup>
          <FormGroup>
            <Label for={nombreLabel}>{nombreLabel}</Label>
            <Input onChange={handleRegisterChange} {...nombreInputProps} />
          </FormGroup>
          <FormGroup>
            <Label for={emailLabel}>{emailLabel}</Label>
            <Input onChange={handleRegisterChange} {...emailInputProps} />
          </FormGroup>
          <FormGroup>
            <Label for={fechaNacimientoLabel}>{fechaNacimientoLabel}</Label>
            <Input
              onChange={handleRegisterChange}
              {...fechaNacimientoInputProps}
            />
          </FormGroup>
        </>
      ) : (
        <>
          <FormGroup>
            <Label for={usernameLabel}>{usernameLabel}</Label>
            <Input onChange={handleLoginChange} {...usernameInputProps} />
          </FormGroup>
          <FormGroup>
            <Label for={passwordLabel}>{passwordLabel}</Label>
            <Input onChange={handleLoginChange} {...passwordInputProps} />
          </FormGroup>
        </>
      )}

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
        onClick={isSignUp ? handleLogIn : handleRegister}
      >
        {renderButtonText()}
        {isAuth && <Redirect to="/" />}
      </Button>

      <div className="text-center pt-1">
        <h6>o</h6>
        <h6>
          {isSignUp ? (
            <a href="#login" onClick={changeAuthState(STATE_LOGIN)}>
              Login
            </a>
          ) : (
            <a href="#signup" onClick={changeAuthState(STATE_SIGNUP)}>
              Registrarse
            </a>
          )}
        </h6>
      </div>

      {children}
    </Form>
  );
};

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  onLogoClick: PropTypes.func,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  identificacionLabel: PropTypes.string,
  identificacionInputProps: PropTypes.object,
  nombreLabel: PropTypes.string,
  nombreInputProps: PropTypes.object,
  emailLabel: PropTypes.string,
  emailInputProps: PropTypes.object,
  fechaNacimientoLabel: PropTypes.string,
  fechaNacimientoInputProps: PropTypes.object,
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
  confirmPasswordLabel: 'Confirmar Contraseña',
  confirmPasswordInputProps: {
    name: 'ConfirmPass',
    type: 'password',
    placeholder: 'Confirme su contraseña',
  },

  identificacionLabel: 'Identificación',
  identificacionInputProps: {
    name: 'Identificacion',
    type: 'text',
    placeholder: 'Ingrese su identificación',
  },
  nombreLabel: 'Nombre',
  nombreInputProps: {
    name: 'Nombre',
    type: 'text',
    placeholder: 'Ingrese su nombre',
  },
  emailLabel: 'Email',
  emailInputProps: {
    name: 'Email',
    type: 'email',
    placeholder: 'Ingrese su email',
  },
  fechaNacimientoLabel: 'Fecha de Nacimiento',
  fechaNacimientoInputProps: {
    name: 'FechaNacimiento',
    type: 'date',
    placeholder: 'Ingrese su fecha de nacimiento',
  },

  onLogoClick: () => {},
};

export default AuthForm;
