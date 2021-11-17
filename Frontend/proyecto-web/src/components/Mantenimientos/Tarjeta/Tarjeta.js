import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';

import { useTarjeta } from '../../../hooks/useTarjeta';
import InsertTarjeta from './InsertTarjeta';
import UpdateTarjeta from './UpdateTarjeta';

const Tarjeta = () => {
  const emptyTarjeta = {
    Descripcion: '',
    Numero: '',
    FechaEmision: '',
    FechaVencimiento: '',
    Estado: '',
  };

  const { tarjetas, postTarjeta, putTarjeta, deleteTarjeta } = useTarjeta();
  const [tarjeta, setTarjeta] = useState(emptyTarjeta);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const clearTarjeta = () => {
    setTarjeta({ ...emptyTarjeta });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setTarjeta(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          'Error de ingreso de tarjeta',
          `El campo de ${campo} está vacio`,
          'error',
        )
      : option === 2
      ? Swal.fire(
          'Error de eliminación de tarjeta',
          'La tarjeta no se ha podido eliminar',
          'error',
        )
      : Swal.fire(
          'Transacción Completa',
          'La tarjeta se ha eliminado',
          'success',
        );
  };

  const handlePostTarjeta = () => {
    const { Descripcion, Numero, FechaEmision, FechaVencimiento, Estado } =
      tarjeta;

    !Descripcion
      ? handleError(1, 'descripcion')
      : !Numero
      ? handleError(1, 'numero')
      : !FechaEmision
      ? handleError(1, 'fecha de emision')
      : !FechaVencimiento
      ? handleError(1, 'fecha de vencimiento')
      : !Estado
      ? handleError(1, 'estado')
      : postTarjeta(tarjeta)
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearTarjeta());
  };

  const handlePutTarjeta = () => {
    const { Descripcion, Numero, FechaEmision, FechaVencimiento, Estado } =
      tarjeta;

    !Descripcion
      ? handleError(1, 'descripcion')
      : !Numero
      ? handleError(1, 'numero')
      : !FechaEmision
      ? handleError(1, 'fecha de emision')
      : !FechaVencimiento
      ? handleError(1, 'fecha de vencimiento')
      : !Estado
      ? handleError(1, 'estado')
      : putTarjeta(tarjeta)
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearTarjeta());
  };

  const handleDeleteTarjeta = tarjeta => {
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
        deleteTarjeta(tarjeta)
          .then(() => clearTarjeta())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <Page title="Tarjetas" className="TablePage">
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
              <Table dark bordered>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Número de Tarjeta</th>
                    <th>Fecha de Emisión</th>
                    <th>Fecha de Vencimiento</th>
                    <th>Estado</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {tarjetas &&
                    tarjetas.map(tarjeta => {
                      return (
                        <tr key={tarjeta && tarjeta.Codigo}>
                          <td>{tarjeta && tarjeta.Codigo}</td>
                          <td>{tarjeta && tarjeta.Descripcion}</td>
                          <td>{tarjeta && tarjeta.Numero}</td>
                          <td>{tarjeta && tarjeta.FechaEmision}</td>
                          <td>{tarjeta && tarjeta.FechaVencimiento}</td>
                          <td>
                            {tarjeta && tarjeta.Estado === 'A'
                              ? 'Activo'
                              : 'Inactivo'}
                          </td>
                          <td>
                            <Button
                              className="btn btn-info"
                              onClick={() => {
                                setTarjeta(tarjeta);
                                setModalUpdate(!modalUpdate);
                              }}
                            >
                              Editar
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              onClick={() => handleDeleteTarjeta(tarjeta)}
                            >
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
              <Button
                className="btn btn-success btn-lg btn-block"
                onClick={() => setModalInsert(!modalInsert)}
              >
                Ingresar
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <InsertTarjeta
        tarjeta={tarjeta}
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostTarjeta={handlePostTarjeta}
        setModalInsert={setModalInsert}
        clearTarjeta={clearTarjeta}
      />

      <UpdateTarjeta
        modalUpdate={modalUpdate}
        tarjeta={tarjeta}
        handleChange={handleChange}
        handlePutTarjeta={handlePutTarjeta}
        setModalUpdate={setModalUpdate}
        clearTarjeta={clearTarjeta}
      />
    </Page>
  );
};

export default Tarjeta;
