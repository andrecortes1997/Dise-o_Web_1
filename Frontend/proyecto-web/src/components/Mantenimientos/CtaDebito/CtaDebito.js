import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';

import { useCtaDebito } from '../../../hooks/useCtaDebito';
import InsertCtaDebito from './InsertCtaDebito.js';
import UpdateCtaDebito from './UpdateCtaDebito';

const CtaDebito = () => {
  const emptyCtaDebito = {
    CodigoUsuario: '',
    CodigoMoneda: '',
    CodigoTarjeta: '',
    Descripcion: '',
    IBAN: '',
    Saldo: '',
    Estado: '',
  };

  const { ctasdebito, postCtaDebito, putCtaDebito, deleteCtaDebito } =
    useCtaDebito();
  const [ctadebito, setCtaDebito] = useState(emptyCtaDebito);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const clearCtaDebito = () => {
    setCtaDebito({ ...emptyCtaDebito });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setCtaDebito(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          'Error de ingreso de cuenta de debito',
          `El campo de ${campo} está vacio`,
          'error',
        )
      : option === 2
      ? Swal.fire(
          'Error de eliminación de cuenta de debito',
          'La cuenta de debito no se ha podido eliminar',
          'error',
        )
      : Swal.fire(
          'Transacción Completa',
          'La cuenta de debito se ha eliminado',
          'success',
        );
  };

  const handlePostCtaDebito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoTarjeta,
      Descripcion,
      IBAN,
      Saldo,
      Estado,
    } = ctadebito;

    !CodigoUsuario
      ? handleError(1, 'codigo de usuario')
      : !CodigoMoneda
      ? handleError(1, 'codigo de moneda')
      : !CodigoTarjeta
      ? handleError(1, 'codigo de tarjeta')
      : !Descripcion
      ? handleError(1, 'descripción')
      : !IBAN
      ? handleError(1, 'IBAN')
      : !Saldo
      ? handleError(1, 'saldo')
      : !Estado
      ? handleError(1, 'estado')
      : postCtaDebito(ctadebito)
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearCtaDebito());
  };

  const handlePutCtaDebito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoTarjeta,
      Descripcion,
      IBAN,
      Saldo,
      Estado,
    } = ctadebito;

    !CodigoUsuario
      ? handleError(1, 'codigo de usuario')
      : !CodigoMoneda
      ? handleError(1, 'codigo de moneda')
      : !CodigoTarjeta
      ? handleError(1, 'codigo de tarjeta')
      : !Descripcion
      ? handleError(1, 'descripción')
      : !IBAN
      ? handleError(1, 'IBAN')
      : !Saldo
      ? handleError(1, 'saldo')
      : !Estado
      ? handleError(1, 'estado')
      : putCtaDebito(ctadebito)
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearCtaDebito());
  };

  const handleDeleteCtaDebito = ctadebito => {
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
        deleteCtaDebito(ctadebito)
          .then(() => clearCtaDebito())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <Page title="Cuentas Debito" className="TablePage">
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
              <Table dark bordered>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Codigo Usuario</th>
                    <th>Codigo Moneda</th>
                    <th>Codigo Tarjeta</th>
                    <th>Descripcion</th>
                    <th>IBAN</th>
                    <th>Saldo</th>
                    <th>Estado</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {ctasdebito &&
                    ctasdebito.map(ctadebito => {
                      return (
                        <tr key={ctadebito && ctadebito.Codigo}>
                          <td>{ctadebito && ctadebito.Codigo}</td>
                          <td>
                            {ctadebito && ctadebito.CodigoUsuario}
                          </td>
                          <td>{ctadebito && ctadebito.CodigoMoneda}</td>
                          <td>
                            {ctadebito && ctadebito.CodigoTarjeta}
                          </td>
                          <td>{ctadebito && ctadebito.Descripcion}</td>
                          <td>{ctadebito && ctadebito.IBAN}</td>
                          <td>{ctadebito && ctadebito.Saldo}</td>
                          <td>
                            {ctadebito && ctadebito.Estado === 'A'
                              ? 'Activo'
                              : 'Inactivo'}
                          </td>
                          <td>
                            <Button
                              className="btn btn-info"
                              onClick={() => {
                                setCtaDebito(ctadebito);
                                setModalUpdate(!modalUpdate);
                              }}
                            >
                              Editar
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              onClick={() => handleDeleteCtaDebito(ctadebito)}
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

      <InsertCtaDebito
        ctadebito={ctadebito}
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostCtaDebito={handlePostCtaDebito}
        setModalInsert={setModalInsert}
        clearCtaDebito={clearCtaDebito}
      />

      <UpdateCtaDebito
        modalUpdate={modalUpdate}
        ctadebito={ctadebito}
        handleChange={handleChange}
        handlePutCtaDebito={handlePutCtaDebito}
        setModalUpdate={setModalUpdate}
        clearCtaDebito={clearCtaDebito}
      />
    </Page>
  );
};

export default CtaDebito;
