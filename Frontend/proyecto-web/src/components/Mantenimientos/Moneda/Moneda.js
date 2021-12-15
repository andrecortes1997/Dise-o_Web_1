import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import ExportMoneda from './ExportMoneda';

import { useMantenimientos } from '../../../hooks/useMantenimientos';
import ModalInsert from './ModalInsert';
import ModalUpdate from './ModalUpdate.js';

const Moneda = () => {
  const emptyMoneda = {
    Descripcion: '',
    Estado: 'A',
  };

  const { useMoneda, useEstadistica } = useMantenimientos();
  const { monedas, postMoneda, putMoneda, deleteMoneda } = useMoneda();
  const { postEstadistica } = useEstadistica();
  const [moneda, setMoneda] = useState(emptyMoneda);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [isExport, setIsExport] = useState(false);

  const clearMoneda = () => {
    setMoneda({ ...emptyMoneda });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setMoneda(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          'Error de ingreso de moneda',
          `El campo de ${campo} está vacio`,
          'error',
        )
      : option === 2
      ? Swal.fire(
          'Error de eliminación de moneda',
          'La moneda no se ha podido eliminar',
          'error',
        )
      : Swal.fire(
          'Transacción Completa',
          'La moneda se ha eliminado',
          'success',
        );
  };

  const handlePostMoneda = () => {
    const { Descripcion, Estado } = moneda;

    !Descripcion
      ? handleError(1, 'descripcion')
      : !Estado
      ? handleError(1, 'estado')
      : postMoneda(moneda)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Moneda', 'Ingresar Moneda'))
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearMoneda());
  };

  const handlePutMoneda = () => {
    const { Descripcion, Estado } = moneda;

    !Descripcion
      ? handleError(1, 'descripcion')
      : !Estado
      ? handleError(1, 'estado')
      : putMoneda(moneda)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Moneda', 'Actualizar Moneda'))
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearMoneda());
  };

  const handleDeleteMoneda = moneda => {
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
        deleteMoneda(moneda)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Moneda', 'Eliminar Moneda'))
          .then(() => clearMoneda())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <>
      {isExport ? (
        <ExportMoneda monedas={monedas} isExport={isExport} setIsExport={setIsExport} />
      ) : (
        <Page title="Monedas" className="TablePage">
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
                      {monedas &&
                        monedas.map(moneda => {
                          return (
                            moneda.Estado === 'A' && (
                              <tr key={moneda && moneda.Codigo}>
                                <td>{moneda && moneda.Codigo}</td>
                                <td>{moneda && moneda.Descripcion}</td>
                                <td>
                                  {moneda && moneda.Estado === 'A'
                                    ? 'Activo'
                                    : 'Inactivo'}
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-info"
                                    onClick={() => {
                                      setMoneda(moneda);
                                      setModalUpdate(!modalUpdate);
                                    }}
                                  >
                                    Editar
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-primary"
                                    onClick={() => handleDeleteMoneda(moneda)}
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
        handlePostMoneda={handlePostMoneda}
        setModalInsert={setModalInsert}
        clearMoneda={clearMoneda}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        moneda={moneda}
        handleChange={handleChange}
        handlePutMoneda={handlePutMoneda}
        setModalUpdate={setModalUpdate}
        clearMoneda={clearMoneda}
      />
    </>
  );
};

export default Moneda;
