import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import ExportTransferencia from './ExportTransferencia';

import { useMantenimientos } from '../../../hooks/useMantenimientos';
import ModalInsert from './ModalInsert';
import ModalUpdate from './ModalUpdate';
import LineChart from '../../ChartJS/LineChart';

const Transferencia = () => {
  const emptyTransferencia = {
    CuentaOrigen: '',
    CuentaDestino: '',
    FechaHora: '',
    Descripcion: '',
    Monto: '',
    Estado: 'A',
  };

  const { useTransferencia, useEstadistica } = useMantenimientos();
  const {
    transferencias,
    postTransferencia,
    putTransferencia,
    deleteTransferencia,
  } = useTransferencia();
  const { postEstadistica } = useEstadistica();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [transferencia, setTransferencia] = useState(emptyTransferencia);
  const [isExport, setIsExport] = useState(false);

  const clearTransferencia = () => {
    setTransferencia({ ...emptyTransferencia });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setTransferencia(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          'Error de ingreso de transferencia',
          `El campo de ${campo} está vacio`,
          'error',
        )
      : option === 2
      ? Swal.fire(
          'Error de eliminación de transferencia',
          'La transferencia no se ha podido eliminar',
          'error',
        )
      : Swal.fire(
          'Transacción Completa',
          'La transferencia se ha eliminado',
          'success',
        );
  };

  const handlePostTransferencia = () => {
    const {
      CuentaOrigen,
      CuentaDestino,
      FechaHora,
      Descripcion,
      Monto,
      Estado,
    } = transferencia;

    !CuentaOrigen
      ? handleError(1, 'cuenta de origen')
      : !CuentaDestino
      ? handleError(1, 'cuenta de destino')
      : !FechaHora
      ? handleError(1, 'fecha y hora')
      : !Descripcion
      ? handleError(1, 'descripción')
      : !Monto
      ? handleError(1, 'monto')
      : !Estado
      ? handleError(1, 'estado')
      : postTransferencia(transferencia)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Transferencia', 'Ingresar Transferencia'))
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearTransferencia());
  };

  const handlePutTransferencia = () => {
    const {
      CuentaOrigen,
      CuentaDestino,
      FechaHora,
      Descripcion,
      Monto,
      Estado,
    } = transferencia;

    !CuentaOrigen
      ? handleError(1, 'cuenta de origen')
      : !CuentaDestino
      ? handleError(1, 'cuenta de destino')
      : !FechaHora
      ? handleError(1, 'fecha y hora')
      : !Descripcion
      ? handleError(1, 'descripción')
      : !Monto
      ? handleError(1, 'monto')
      : !Estado
      ? handleError(1, 'estado')
      : putTransferencia(transferencia)
      .then(() => postEstadistica(localStorage.getItem("Codigo"),'Transferencia', 'Actualizar Transferencia'))
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearTransferencia());
  };

  const handleDeleteTransferencia = transferencia => {
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
        deleteTransferencia(transferencia)
        .then(() => postEstadistica(localStorage.getItem("Codigo"),'Transferencia', 'Eliminar Transferencia'))
          .then(() => clearTransferencia())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

   //#region Chart Transferencia

   const chartMontoData = () => {
    const data = transferencias.map(transferencia => transferencia.Monto).sort((a, b) => a - b);
    const lineData = {
      labels: data,
      datasets: [
        {
          data: data,
          backgroundColor: "White",
          borderColor: "#00c9ff",
          fill: false,
          tension: 0.1,
        },
      ],
    };

    return lineData;
  };

  //#endregion Chart Transferencia

  return (
    <>
      {isExport ? (
        <ExportTransferencia
          transferencias={transferencias}
          isExport={isExport}
          setIsExport={setIsExport}
        />
      ) : (
        <Page title="Transferencias" className="TablePage">
          <Card className="mb-3">
            <CardBody>
              <Row>
                <Col>
                  <Table dark bordered>
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Cuenta de Origen</th>
                        <th>Cuenta de Destino</th>
                        <th>Fecha y Hora</th>
                        <th>Descripción</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transferencias &&
                        transferencias.map(transferencia => {
                          return (
                            transferencia.Estado === 'A' && (
                              <tr key={transferencia && transferencia.Codigo}>
                                <td>{transferencia && transferencia.Codigo}</td>
                                <td>
                                  {transferencia && transferencia.CuentaOrigen}
                                </td>
                                <td>
                                  {transferencia && transferencia.CuentaDestino}
                                </td>
                                <td>
                                  {transferencia &&
                                    transferencia.FechaHora.replaceAll(
                                      '-',
                                      '/',
                                    ).replace('T', ' ')}
                                </td>
                                <td>
                                  {transferencia && transferencia.Descripcion}
                                </td>
                                <td>{transferencia && transferencia.Monto}</td>
                                <td>
                                  {transferencia && transferencia.Estado === 'A'
                                    ? 'Activo'
                                    : 'Inactivo'}
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-info"
                                    onClick={() => {
                                      setTransferencia(transferencia);
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
                                      handleDeleteTransferencia(transferencia)
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

          <Card>
            <CardBody>
              <Row>
                <LineChart
                  title="Transferencias"
                  descripcion="Comparativa de montos transferidos entre cuentas"
                  data={chartMontoData}
                />
              </Row>
            </CardBody>
          </Card>

        </Page>
      )}

      <ModalInsert
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostTransferencia={handlePostTransferencia}
        setModalInsert={setModalInsert}
        clearTransferencia={clearTransferencia}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        transferencia={transferencia}
        handleChange={handleChange}
        handlePutTransferencia={handlePutTransferencia}
        setModalUpdate={setModalUpdate}
        clearTransferencia={clearTransferencia}
      />
    </>
  );
};

export default Transferencia;
