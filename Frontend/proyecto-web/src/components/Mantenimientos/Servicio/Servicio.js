import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import ExportServicio from './ExportServicio';

import { useMantenimientos } from '../../../hooks/useMantenimientos';
import ModalInsert from './ModalInsert';
import ModalUpdate from './ModalUpdate.js';

const Servicio = () => {
  const emptyServicio = {
    Descripcion: '',
    Estado: 'A',
  };

  const { useServicio } = useMantenimientos();
  const { servicios, postServicio, putServicio, deleteServicio } =
    useServicio();
  const [servicio, setServicio] = useState(emptyServicio);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [isExport, setIsExport] = useState(false);

  const clearServicio = () => {
    setServicio({ ...emptyServicio });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setServicio(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          'Error de ingreso de servicio',
          `El campo de ${campo} está vacio`,
          'error',
        )
      : option === 2
      ? Swal.fire(
          'Error de eliminación de servicio',
          'El servicio no se ha podido eliminar',
          'error',
        )
      : Swal.fire(
          'Transacción Completa',
          'El servicio se ha eliminado',
          'success',
        );
  };

  const handlePostServicio = () => {
    const { Descripcion, Estado } = servicio;

    !Descripcion
      ? handleError(1, 'descripcion')
      : !Estado
      ? handleError(1, 'estado')
      : postServicio(servicio)
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearServicio());
  };

  const handlePutServicio = () => {
    const { Descripcion, Estado } = servicio;

    !Descripcion
      ? handleError(1, 'descripcion')
      : !Estado
      ? handleError(1, 'estado')
      : putServicio(servicio)
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearServicio());
  };

  const handleDeleteServicio = servicio => {
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
        deleteServicio(servicio)
          .then(() => clearServicio())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isExport ? (
        <ExportServicio
          servicios={servicios}
          isExport={isExport}
          setIsExport={setIsExport}
        />
      ) : (
        <Page title="Servicios" className="TablePage">
          <Card className="mb-3">
            <CardBody>
              <Row>
                <Col>
                  <Table dark bordered>
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicios &&
                        servicios.map(servicio => {
                          return (
                            servicio.Estado === 'A' && (
                              <tr key={servicio && servicio.Codigo}>
                                <td>{servicio && servicio.Codigo}</td>
                                <td>{servicio && servicio.Descripcion}</td>
                                <td>
                                  {servicio && servicio.Estado === 'A'
                                    ? 'Activo'
                                    : 'Inactivo'}
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-info"
                                    onClick={() => {
                                      setServicio(servicio);
                                      setModalUpdate(!modalUpdate);
                                    }}
                                  >
                                    Editar
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-primary"
                                    onClick={() =>
                                      handleDeleteServicio(servicio)
                                    }
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
        handlePostServicio={handlePostServicio}
        setModalInsert={setModalInsert}
        clearServicio={clearServicio}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        servicio={servicio}
        handleChange={handleChange}
        handlePutServicio={handlePutServicio}
        setModalUpdate={setModalUpdate}
        clearServicio={clearServicio}
      />
    </>
  );
};

export default Servicio;
