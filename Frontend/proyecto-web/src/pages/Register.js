import E_Corp from 'assets/img/logo/E_Corp.PNG';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import Swal from 'sweetalert2';
import { register } from '../services/Register';

const Register = props => {
  const emptyForm = {
    Identificacion: '',
    Nombre: '',
    Username: '',
    Email: '',
    Password: '',
    ConfirmPass: '',
    FechaNacimiento: '',
    Estado: 'A',
  };

  const [registerForm, setRegisterForm] = useState(emptyForm);

  const {
    showLogo,
    usernameLabel,
    usernameInputProps,
    passwordLabel,
    passwordInputProps,
    confirmPasswordLabel,
    confirmPasswordInputProps,
    children,
    identificacionLabel,
    identificacionInputProps,
    nombreLabel,
    nombreInputProps,
    emailLabel,
    emailInputProps,
    fechaNacimientoLabel,
    fechaNacimientoInputProps,
  } = props;

  const handleSubmit = event => {
    event.preventDefault();
  };

  const handleChange = async e => {
    const { name, value } = e.target;
    setRegisterForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
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
      ? Swal.fire('Error de Registro', 'Las contraseñas no coinciden', 'error')
      : option === 4
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

  const onRegister = async () => {
    await register(registerForm)
      .then(status => {
        if (status === 200) {
          props.history.push('/login');
        }
        handleRegisterErrors(5);
      })
      .catch(e => {
        console.log(e);
        handleRegisterErrors(4);
      });
  };

  const handleRegister = () => {
    const {
      Identificacion,
      Nombre,
      Username,
      Email,
      Password,
      ConfirmPass,
      FechaNacimiento,
    } = registerForm;

    const regex = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    !Username
      ? handleRegisterErrors(1, 'nombre de usuario')
      : !Password
      ? handleRegisterErrors(1, 'contraseña')
      : !ConfirmPass
      ? handleRegisterErrors(1, 'confirmar contraseña')
      : ConfirmPass !== Password
      ? handleRegisterErrors(3)
      : !Identificacion
      ? handleRegisterErrors(1, 'identificacion')
      : !Nombre
      ? handleRegisterErrors(1, 'nombre completo')
      : !Email
      ? handleRegisterErrors(1, 'email')
      : !regex.test(Email)
      ? handleRegisterErrors(2)
      : !FechaNacimiento
      ? handleRegisterErrors(1, 'fecha de nacimiento')
      : onRegister();
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
              <FormGroup>
                <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
                <Input onChange={handleChange} {...confirmPasswordInputProps} />
              </FormGroup>
              <FormGroup>
                <Label for={identificacionLabel}>{identificacionLabel}</Label>
                <Input onChange={handleChange} {...identificacionInputProps} />
              </FormGroup>
              <FormGroup>
                <Label for={nombreLabel}>{nombreLabel}</Label>
                <Input onChange={handleChange} {...nombreInputProps} />
              </FormGroup>
              <FormGroup>
                <Label for={emailLabel}>{emailLabel}</Label>
                <Input onChange={handleChange} {...emailInputProps} />
              </FormGroup>
              <FormGroup>
                <Label for={fechaNacimientoLabel}>{fechaNacimientoLabel}</Label>
                <Input onChange={handleChange} {...fechaNacimientoInputProps} />
              </FormGroup>
            </>

            <Button
              size="lg"
              className="bg-gradient-theme-left border-0"
              block
              onClick={handleRegister}
            >
              Registrarse
            </Button>

            <div className="text-center pt-1">
              <h6>o</h6>
              <h6>
                <a href="/login">Login</a>
              </h6>
            </div>

            {children}
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

Register.propTypes = {
  showLogo: PropTypes.bool,
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

Register.defaultProps = {
  showLogo: true,
  usernameLabel: 'Nombre de Usuario',
  usernameInputProps: {
    name: 'Username',
    type: 'text',
    placeholder: 'Ingrese su nombre de usuario',
    autoComplete: 'username',
  },
  passwordLabel: 'Contraseña',
  passwordInputProps: {
    name: 'Password',
    type: 'password',
    placeholder: 'Ingrese su contraseña',
    autoComplete: 'new-password',
  },
  confirmPasswordLabel: 'Confirmar Contraseña',
  confirmPasswordInputProps: {
    name: 'ConfirmPass',
    type: 'password',
    placeholder: 'Confirme su contraseña',
    autoComplete: 'new-password',
  },

  identificacionLabel: 'Identificación',
  identificacionInputProps: {
    name: 'Identificacion',
    type: 'text',
    placeholder: 'Ingrese su identificación',
  },
  nombreLabel: 'Nombre Completo',
  nombreInputProps: {
    name: 'Nombre',
    type: 'text',
    placeholder: 'Ingrese su nombre completo',
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
};

export default Register;
