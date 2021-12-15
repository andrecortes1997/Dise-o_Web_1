import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import ExportUsuario from './ExportUsuario';

import { useMantenimientos } from '../../../hooks/useMantenimientos';
import ModalInsert from './ModalInsert';
import ModalUpdate from './ModalUpdate';

const Usuario = () => {
  const emptyUsuario = {
    Identificacion: '',
    Nombre: '',
    Username: '',
    Password: '',
    Email: '',
    FechaNacimiento: '',
    Estado: 'A',
  };

  const { useUsuario, useEstadistica } = useMantenimientos();
  const { postEstadistica } = useEstadistica();
  const { usuarios, postUsuario, putUsuario, deleteUsuario } = useUsuario();
  const [usuario, setUsuario] = useState(emptyUsuario);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [isExport, setIsExport] = useState(false);

  const clearUsuario = () => {
    setUsuario({ ...emptyUsuario });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUsuario(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          'Error de ingreso de usuario',
          `El campo de ${campo} está vacio`,
          'error',
        )
      : option === 2
      ? Swal.fire(
          'Error de eliminación de usuario',
          'El usuario no se ha podido eliminar',
          'error',
        )
      : Swal.fire(
          'Transacción Completa',
          'El usuario se ha eliminado',
          'success',
        );
  };

  const handlePostUsuario = () => {
    const {
      Identificacion,
      Nombre,
      Username,
      Password,
      Email,
      FechaNacimiento,
      Estado,
    } = usuario;

    !Identificacion
      ? handleError(1, 'identificacion')
      : !Nombre
      ? handleError(1, 'nombre completo')
      : !Username
      ? handleError(1, 'nombre de usuario')
      : !Password
      ? handleError(1, 'contraseña')
      : !Email
      ? handleError(1, 'correo')
      : !FechaNacimiento
      ? handleError(1, 'fecha de nacimiento')
      : !Estado
      ? handleError(1, 'Estado')
      : postUsuario(usuario)
      .then(() => postEstadistica(localStorage.getItem("Codigo"),'Usuario', 'Ingresar Usuario'))
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearUsuario());
  };

  const handlePutUsuario = () => {
    const {
      Identificacion,
      Nombre,
      Username,
      Password,
      Email,
      FechaNacimiento,
      Estado,
    } = usuario;

    !Identificacion
      ? handleError(1, 'identificacion')
      : !Nombre
      ? handleError(1, 'nombre completo')
      : !Username
      ? handleError(1, 'nombre de usuario')
      : !Password
      ? handleError(1, 'contraseña')
      : !Email
      ? handleError(1, 'correo')
      : !FechaNacimiento
      ? handleError(1, 'fecha de nacimiento')
      : !Estado
      ? handleError(1, 'Estado')
      : putUsuario(usuario)
      .then(() => postEstadistica(localStorage.getItem("Codigo"),'Usuario', 'Actualizar Usuario'))
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearUsuario());
  };

  const handleDeleteUsuario = usuario => {
    Swal.fire({
      title: 'Esta seguro de eliminar?',
      text: 'Esta accion no se puede devolver!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        deleteUsuario(usuario)
        .then(() => postEstadistica(localStorage.getItem("Codigo"),'Usuario', 'Eliminar Usuario'))
          .then(() => clearUsuario())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isExport ? (
        <ExportUsuario
          usuarios={usuarios}
          isExport={isExport}
          setIsExport={setIsExport}
        />
      ) : (
        <Page title="Usuarios" className="TablePage">
          <Card className="mb-3">
            <CardBody>
              <Row>
                <Col>
                  <Table dark bordered>
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Identificación</th>
                        <th>Nombre Completo</th>
                        <th>Nombre de Usuario</th>
                        <th>Contraseña</th>
                        <th>Correo</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuarios &&
                        usuarios.map(usuario => {
                          return (
                            usuario.Estado === 'A' && (
                              <tr key={usuario && usuario.Codigo}>
                                <td>{usuario && usuario.Codigo}</td>
                                <td>{usuario && usuario.Identificacion}</td>
                                <td>{usuario && usuario.Nombre}</td>
                                <td>{usuario && usuario.Username}</td>
                                <td>{usuario && usuario.Password}</td>
                                <td>{usuario && usuario.Email}</td>
                                <td>
                                  {usuario &&
                                    usuario.FechaNacimiento.replaceAll(
                                      '-',
                                      '/',
                                    ).replace('T', ' ')}
                                </td>
                                <td>
                                  {usuario && usuario.Estado === 'A'
                                    ? 'Activo'
                                    : 'Inactivo'}
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-info"
                                    onClick={() => {
                                      setUsuario(usuario);
                                      setModalUpdate(!modalUpdate);
                                    }}
                                  >
                                    Editar
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-primary"
                                    onClick={() => handleDeleteUsuario(usuario)}
                                  >
                                    Eliminar
                                  </Button>
                                </td>
                              </tr>
                            )
                          );
                        })}
                    </tbody>
                  </Table>
                  <Button
                    className="btn btn-info btn-lg btn-block"
                    onClick={() => setModalInsert(!modalInsert)}
                  >
                    Ingresar
                  </Button>

                  <Button
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => setIsExport(!isExport)}
                  >
                    Exportar
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Page>
      )}

      <ModalInsert
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostUsuario={handlePostUsuario}
        setModalInsert={setModalInsert}
        clearUsuario={clearUsuario}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        usuario={usuario}
        handleChange={handleChange}
        handlePutUsuario={handlePutUsuario}
        setModalUpdate={setModalUpdate}
        clearUsuario={clearUsuario}
      />
    </>
  );
};

export default Usuario;
