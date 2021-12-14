import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import ExportPago from './ExportPago';

import { useMantenimientos } from '../../../hooks/useMantenimientos';
import ModalInsert from './ModalInsert';
import ModalUpdate from './ModalUpdate';
import BarChart from '../../ChartJS/BarChart';

const Pago = () => {
  const emptyPago = {
    CodigoUsuario: '',
    CodigoServicio: '',
    CodigoTarjeta: '',
    Descripcion: '',
    Fechahora: '',
    Monto: '',
  };

  const { usePago, useUsuario, useServicio, useTarjeta, useCharts } =
    useMantenimientos();
  const { pagos, postPago, putPago, deletePago } = usePago();
  const { usuarios } = useUsuario();
  const { servicios } = useServicio();
  const { tarjetas } = useTarjeta();
  const [pago, setPago] = useState(emptyPago);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [isExport, setIsExport] = useState(false);

  const clearPago = () => {
    setPago({ ...emptyPago });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setPago(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleError = (option, campo) => {
    option === 1
      ? Swal.fire(
          'Error de ingreso de pago',
          `El campo de ${campo} está vacio`,
          'error',
        )
      : option === 2
      ? Swal.fire(
          'Error de eliminación de pago',
          'El pago no se ha podido eliminar',
          'error',
        )
      : Swal.fire('Transacción Completa', 'El pago se ha eliminado', 'success');
  };

  const handlePostPago = () => {
    const {
      CodigoUsuario,
      CodigoServicio,
      CodigoTarjeta,
      Descripcion,
      Fechahora,
      Monto,
    } = pago;

    !CodigoUsuario
      ? handleError(1, 'codigo de usuario')
      : !CodigoServicio
      ? handleError(1, 'codigo de servicio')
      : !CodigoTarjeta
      ? handleError(1, 'codigo de tarjeta')
      : !Descripcion
      ? handleError(1, 'descripcion')
      : !Fechahora
      ? handleError(1, 'fecha y hora')
      : !Monto
      ? handleError(1, 'Monto')
      : postPago(pago)
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearPago());
  };

  const handlePutPago = () => {
    const {
      CodigoUsuario,
      CodigoServicio,
      CodigoTarjeta,
      Descripcion,
      Fechahora,
      Monto,
    } = pago;

    !CodigoUsuario
      ? handleError(1, 'codigo de usuario')
      : !CodigoServicio
      ? handleError(1, 'codigo de servicio')
      : !CodigoTarjeta
      ? handleError(1, 'codigo de tarjeta')
      : !Descripcion
      ? handleError(1, 'descripcion')
      : !Fechahora
      ? handleError(1, 'fecha y hora')
      : !Monto
      ? handleError(1, 'Monto')
      : putPago(pago)
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearPago());
  };

  const handleDeletePago = pago => {
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
        deletePago(pago)
          .then(() => clearPago())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  //#region Chart Pago

  const chartUsuarioData = () => {
    const data = pagos.map(pago => pago.CodigoUsuario).sort((a, b) => a - b);

    const filteredData = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const labels = filteredData.map(pago =>
      usuarios
        .filter(usuario => usuario.Codigo === pago)
        .map(usuario => usuario.Nombre),
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartServicioData = () => {
    const data = pagos.map(pago => pago.CodigoServicio).sort((a, b) => a - b);

    const filteredData = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const labels = filteredData.map(pago =>
      servicios
        .filter(servicio => servicio.Codigo === pago)
        .map(servicio => servicio.Descripcion),
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  //#endregion Chart Pago

  return (
    <>
      {isExport ? (
        <ExportPago
          pagos={pagos}
          usuarios={usuarios}
          servicios={servicios}
          tarjetas={tarjetas}
          isExport={isExport}
          setIsExport={setIsExport}
        />
      ) : (
        <Page title="Pagos" className="TablePage">
          <Card className="mb-3">
            <CardBody>
              <Row>
                <Col>
                  <Table dark bordered>
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Usuario</th>
                        <th>Servicio</th>
                        <th>Tarjeta</th>
                        <th>Descripción</th>
                        <th>Fecha y hora</th>
                        <th>Monto</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagos &&
                        pagos.map(pago => {
                          return (
                            <tr key={pago && pago.Codigo}>
                              <td>{pago && pago.Codigo}</td>

                              {usuarios
                                .filter(
                                  usuario =>
                                    usuario.Codigo === pago.CodigoUsuario,
                                )
                                .map(usuario => (
                                  <td key={usuario && usuario.Codigo}>
                                    {usuario && usuario.Nombre}
                                  </td>
                                ))}

                              {servicios
                                .filter(
                                  servicio =>
                                    servicio.Codigo === pago.CodigoServicio,
                                )
                                .map(servicio => (
                                  <td key={servicio && servicio.Codigo}>
                                    {servicio && servicio.Descripcion}
                                  </td>
                                ))}

                              {tarjetas
                                .filter(
                                  tarjeta =>
                                    tarjeta.Codigo === pago.CodigoTarjeta,
                                )
                                .map(tarjeta => (
                                  <td key={tarjeta && tarjeta.Codigo}>
                                    {tarjeta && tarjeta.Numero}
                                  </td>
                                ))}

                              <td>{pago && pago.Descripcion}</td>
                              <td>
                                {pago &&
                                  pago.Fechahora.replaceAll('-', '/').replace(
                                    'T',
                                    ' ',
                                  )}
                              </td>
                              <td>{pago && pago.Monto}</td>
                              <td>
                                <Button
                                  className="btn btn-info"
                                  onClick={() => {
                                    setPago(pago);
                                    setModalUpdate(!modalUpdate);
                                  }}
                                >
                                  Editar
                                </Button>
                              </td>
                              <td>
                                <Button
                                  className="btn btn-primary"
                                  onClick={() => handleDeletePago(pago)}
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
                <Col>
                  <BarChart
                    title="Pagos"
                    descripcion="Usuarios más frecuentes"
                    data={chartUsuarioData}
                  />
                </Col>
                <Col>
                  <BarChart
                    title="Pagos"
                    descripcion="Servicios más pagados"
                    data={chartServicioData}
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
        handlePostPago={handlePostPago}
        setModalInsert={setModalInsert}
        clearPago={clearPago}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        pago={pago}
        handleChange={handleChange}
        handlePutPago={handlePutPago}
        setModalUpdate={setModalUpdate}
        clearPago={clearPago}
      />
    </>
  );
};

export default Pago;
