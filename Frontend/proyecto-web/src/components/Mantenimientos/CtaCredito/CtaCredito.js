import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';

import { useCtaCredito } from '../../../hooks/useCtaCredito';
import InsertCtaCredito from './InsertCtaCredito';
import UpdateCtaCredito from './InsertCtaCredito';

const CtaCredito = () => {
  const emptyCtaCredito = {
    CodigoUsuario: '',
    CodigoMoneda: '',
    CodigoTarjeta: '',
    Descripción: '',
    IBAN: '',
    Saldo: '',
    FechaPago: '',
    PagoMinimo: '',
    PagoContado: '',
    Estado: '',
  };

  const { ctascredito, postCtaCredito, putCtaCredito, deleteCtaCredito } =
    useCtaCredito();
  const [ctacredito, setCtaCredito] = useState(emptyCtaCredito);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const clearCtaCredito = () => {
    setCtaCredito({ ...emptyCtaCredito });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setCtaCredito(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          'Error de ingreso de cuenta de credito',
          `El campo de ${campo} está vacio`,
          'error',
        )
      : option === 2
      ? Swal.fire(
          'Error de eliminación de cuenta de credito',
          'La cuenta de credito no se ha podido eliminar',
          'error',
        )
      : Swal.fire(
          'Transacción Completa',
          'La cuenta de credito se ha eliminado',
          'success',
        );
  };

  const handlePostCtaCredito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoTarjeta,
      Descripción,
      IBAN,
      Saldo,
      FechaPago,
      PagoMinimo,
      PagoContado,
      Estado,
    } = ctacredito;

    !CodigoUsuario
      ? handleError(1, 'codigo de usuario')
      : !CodigoMoneda
      ? handleError(1, 'codigo de moneda')
      : !CodigoTarjeta
      ? handleError(1, 'codigo de tarjeta')
      : !Descripción
      ? handleError(1, 'descripción')
      : !IBAN
      ? handleError(1, 'IBAN')
      : !Saldo
      ? handleError(1, 'saldo')
      : !FechaPago
      ? handleError(1, 'fecha de pago')
      : !PagoMinimo
      ? handleError(1, 'pago minimo')
      : !PagoContado
      ? handleError(1, 'pago de contado')
      : !Estado
      ? handleError(1, 'estado')
      : postCtaCredito(ctacredito)
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearCtaCredito());
  };

  const handlePutCtaCredito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoTarjeta,
      Descripción,
      IBAN,
      Saldo,
      FechaPago,
      PagoMinimo,
      PagoContado,
      Estado,
    } = ctacredito;

    !CodigoUsuario
      ? handleError(1, 'codigo de usuario')
      : !CodigoMoneda
      ? handleError(1, 'codigo de moneda')
      : !CodigoTarjeta
      ? handleError(1, 'codigo de tarjeta')
      : !Descripción
      ? handleError(1, 'descripción')
      : !IBAN
      ? handleError(1, 'IBAN')
      : !Saldo
      ? handleError(1, 'saldo')
      : !FechaPago
      ? handleError(1, 'fecha de pago')
      : !PagoMinimo
      ? handleError(1, 'pago minimo')
      : !PagoContado
      ? handleError(1, 'pago de contado')
      : !Estado
      ? handleError(1, 'estado')
      : putCtaCredito(ctacredito)
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearCtaCredito());
  };

  const handleDeleteCtaCredito = cuenta_credito => {
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
        deleteCtaCredito(ctacredito)
          .then(() => clearCtaCredito())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  return (
    <Page title="Cuentas Credito" className="TablePage">
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
                    <th>Codigo Sucursal</th>
                    <th>Codigo Tarjeta</th>
                    <th>Descripción</th>
                    <th>IBAN</th>
                    <th>Saldo</th>
                    <th>Fecha de Pago</th>
                    <th>Pago Minimo</th>
                    <th>Pago Contado</th>
                    <th>Estado</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {ctascredito &&
                    ctascredito.map(ctacredito => {
                      return (
                        <tr key={ctacredito && ctacredito.Codigo}>
                          <td>
                                  {ctacredito && ctacredito.Codigo}
                                </td>
                                <td>
                                  {ctacredito &&
                                    ctacredito.CodigoUsuario}
                                </td>
                                <td>
                                  {ctacredito &&
                                    ctacredito.CodigoMoneda}
                                </td>
                                <td>
                                  {ctacredito &&
                                    ctacredito.CodigoSucursal}
                                </td>
                                <td>
                                  {ctacredito &&
                                    ctacredito.CodigoTarjeta}
                                </td>
                                <td>
                                  {ctacredito && ctacredito.Descripción}
                                </td>
                                <td>{ctacredito && ctacredito.IBAN}</td>
                                <td>
                                  {ctacredito && ctacredito.Saldo}
                                </td>
                                <td>
                                  {ctacredito && ctacredito.FechaPago}
                                </td>
                                <td>
                                  {ctacredito && ctacredito.PagoMinimo}
                                </td>
                                <td>
                                  {ctacredito && ctacredito.PagoContado}
                                </td>
                                <td>
                                  {ctacredito &&
                                  ctacredito.Estado === "A"
                                    ? "Activo"
                                    : "Inactivo"}
                                </td>
                          <td>
                            <Button
                              className="btn btn-info"
                              onClick={() => {
                                setCtaCredito(ctacredito);
                                setModalUpdate(!modalUpdate);
                              }}
                            >
                              Editar
                            </Button>
                          </td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              onClick={() => handleDeleteCtaCredito(ctacredito)}
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

      <InsertCtaCredito
        ctacredito={ctacredito}
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostCtaCredito={handlePostCtaCredito}
        setModalInsert={setModalInsert}
        clearCtaCredito={clearCtaCredito}
      />

      <UpdateCtaCredito
        modalUpdate={modalUpdate}
        ctacredito={ctacredito}
        handleChange={handleChange}
        handlePutCtaCredito={handlePutCtaCredito}
        setModalUpdate={setModalUpdate}
        clearCtaCredito={clearCtaCredito}
      />
    </Page>
  );
};

export default CtaCredito;
