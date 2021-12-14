import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import ExportTarjeta from './ExportTarjeta';

import { useMantenimientos } from '../../../hooks/useMantenimientos';
import ModalInsert from './ModalInsert';
import ModalUpdate from './ModalUpdate.js';
import PieChart from '../../ChartJS/PieChart';

import CreditCard from '../../Card/CreditCard';

const Tarjeta = () => {
  const emptyTarjeta = {
    CodigoUsuario: '',
    Descripcion: '',
    Numero: '',
    CVC: '',
    FechaVencimiento: '',
    Estado: 'A',
  };

  const { useUsuario, useTarjeta, useCharts } = useMantenimientos();
  const { usuarios } = useUsuario();
  const { tarjetas, postTarjeta, putTarjeta, deleteTarjeta } = useTarjeta();
  const [tarjeta, setTarjeta] = useState(emptyTarjeta);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [isExport, setIsExport] = useState(false);

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
    const {
      CodigoUsuario,
      Descripcion,
      Numero,
      CVC,
      FechaVencimiento,
      Estado,
    } = tarjeta;

    !CodigoUsuario
      ? handleError(1, 'codigo de usuario')
      : !Descripcion
      ? handleError(1, 'descripcion')
      : !Numero
      ? handleError(1, 'numero')
      : !CVC
      ? handleError(1, 'CVC')
      : !FechaVencimiento
      ? handleError(1, 'fecha de vencimiento')
      : !Estado
      ? handleError(1, 'estado')
      : postTarjeta(tarjeta)
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearTarjeta());
  };

  const handlePutTarjeta = () => {
    const {
      CodigoUsuario,
      Descripcion,
      Numero,
      CVC,
      FechaVencimiento,
      Estado,
    } = tarjeta;

    !CodigoUsuario
      ? handleError(1, 'codigo de usuario')
      : !Descripcion
      ? handleError(1, 'descripcion')
      : !Numero
      ? handleError(1, 'numero')
      : !CVC
      ? handleError(1, 'CVC')
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

  //#region Chart Tarjeta

  const chartUsuarioData = () => {
    const data = tarjetas.map(tarjeta => tarjeta.CodigoUsuario).sort((a, b) => a - b);

    const filteredData = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const labels = filteredData.map(tarjeta =>
      usuarios
        .filter(usuario => usuario.Codigo === tarjeta)
        .map(usuario => usuario.Nombre),
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartTarjetaData = () => {
    const data = tarjetas.map(tarjeta => tarjeta.Descripcion).sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  //#endregion Chart Tarjeta

  return (
    <>
      {isExport ? (
        <ExportTarjeta
          tarjetas={tarjetas}
          usuarios={usuarios}
          isExport={isExport}
          setIsExport={setIsExport}
        />
      ) : (
        <Page title="Tarjetas" className="TablePage">
          <Card className="mb-3">
            <CardBody>
              <Row>
                <Col>
                  <Table dark bordered>
                    <thead className="text-center">
                      <tr>
                        <th>Código</th>
                        <th>Usuario</th>
                        <th>Descripción</th>
                        <th>Número de Tarjeta</th>
                        <th>CVC</th>
                        <th>Fecha de Vencimiento</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {tarjetas &&
                        tarjetas.map(tarjeta => {
                          return (
                            tarjeta.Estado === 'A' && (
                              <tr key={tarjeta && tarjeta.Codigo}>
                                <td>{tarjeta && tarjeta.Codigo}</td>

                                {usuarios
                                  .filter(
                                    usuario =>
                                      usuario.Codigo === tarjeta.CodigoUsuario,
                                  )
                                  .map(usuario => (
                                    <td key={usuario && usuario.Codigo}>
                                      {usuario && usuario.Nombre}
                                    </td>
                                  ))}

                                <td>{tarjeta && tarjeta.Descripcion}</td>
                                <td>{tarjeta && tarjeta.Numero}</td>
                                <td>{tarjeta && tarjeta.CVC}</td>
                                <td>
                                  {tarjeta &&
                                    tarjeta.FechaVencimiento.replaceAll(
                                      '-',
                                      '/',
                                    ).replace('T', ' ')}
                                </td>
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
            <CardBody className="mb-2">
              <Row className="justify-content-center">
                {tarjetas.map(
                  tarjeta =>
                    tarjeta.Estado === 'A' && (
                      <div key={tarjeta && tarjeta.Codigo}>
                        {usuarios
                          .filter(
                            usuario => usuario.Codigo === tarjeta.CodigoUsuario,
                          )
                          .map(usuario => (
                            <CreditCard
                              key={usuario && usuario.Codigo}
                              tarjeta={tarjeta}
                              name={usuario.Nombre}
                            />
                          ))}
                        <br />
                      </div>
                    ),
                )}
              </Row>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Row>
                <Col>
                  <PieChart
                    title="Tarjetas"
                    descripcion="Usuarios con más tarjetas"
                    data={chartUsuarioData}
                  />
                </Col>
                <Col>
                  <PieChart
                    title="Tarjetas"
                    descripcion="Tipo de tarjeta más utilizada"
                    data={chartTarjetaData}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Page>
      )}

      <ModalInsert
        modalInsert={modalInsert}
        handleChange={handleChange}
        handlePostTarjeta={handlePostTarjeta}
        setModalInsert={setModalInsert}
        clearTarjeta={clearTarjeta}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        tarjeta={tarjeta}
        handleChange={handleChange}
        handlePutTarjeta={handlePutTarjeta}
        setModalUpdate={setModalUpdate}
        clearTarjeta={clearTarjeta}
      />
    </>
  );
};

export default Tarjeta;
