import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import ExportCuentaCredito from './ExportCuentaCredito';

import { useMantenimientos } from '../../../hooks/useMantenimientos';
import ModalInsert from './ModalInsert';
import ModalUpdate from './ModalUpdate';
import BarChart from '../../ChartJS/BarChart';
import LineChart from '../../ChartJS/LineChart';

const Cuenta_Credito = () => {
  const emptyCuenta_Credito = {
    CodigoUsuario: '',
    CodigoMoneda: '',
    CodigoTarjeta: '',
    Descripcion: '',
    IBAN: '',
    Saldo: '',
    FechaPago: '',
    PagoMinimo: '',
    PagoContado: '',
    Estado: 'A',
  };

  const { useUsuario, useMoneda, useTarjeta, useCuenta_Credito, useCharts, useEstadistica } =
    useMantenimientos();
  const { postEstadistica } = useEstadistica();
  const { usuarios } = useUsuario();
  const { monedas } = useMoneda();
  const { tarjetas } = useTarjeta();
  const {
    cuentas_credito,
    postCuenta_Credito,
    putCuenta_Credito,
    deleteCuenta_Credito,
  } = useCuenta_Credito();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [cuenta_credito, setCuenta_Credito] = useState(emptyCuenta_Credito);
  const [isExport, setIsExport] = useState(false);

  const clearCuenta_Credito = () => {
    setCuenta_Credito({ ...emptyCuenta_Credito });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setCuenta_Credito(prevState => ({
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

  const handlePostCuenta_Credito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoTarjeta,
      Descripcion,
      IBAN,
      Saldo,
      FechaPago,
      PagoMinimo,
      PagoContado,
      Estado,
    } = cuenta_credito;

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
      : !FechaPago
      ? handleError(1, 'fecha de pago')
      : !PagoMinimo
      ? handleError(1, 'pago minimo')
      : !PagoContado
      ? handleError(1, 'pago de contado')
      : !Estado
      ? handleError(1, 'estado')
      : postCuenta_Credito(cuenta_credito)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Cuenta Credito', 'Ingresar Cuenta Credito'))
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearCuenta_Credito());
  };

  const handlePutCuenta_Credito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoTarjeta,
      Descripcion,
      IBAN,
      Saldo,
      FechaPago,
      PagoMinimo,
      PagoContado,
      Estado,
    } = cuenta_credito;

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
      : !FechaPago
      ? handleError(1, 'fecha de pago')
      : !PagoMinimo
      ? handleError(1, 'pago minimo')
      : !PagoContado
      ? handleError(1, 'pago de contado')
      : !Estado
      ? handleError(1, 'estado')
      : putCuenta_Credito(cuenta_credito)
          .then(() => postEstadistica(localStorage.getItem("Codigo"),'Cuenta Credito', 'Actualizar Cuenta Credito'))
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearCuenta_Credito());
  };

  const handleDeleteCuenta_Credito = cuenta_credito => {
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
        deleteCuenta_Credito(cuenta_credito)
            .then(() => postEstadistica(localStorage.getItem("Codigo"),'Cuenta Credito', 'Eliminar Cuenta Credito'))
          .then(() => clearCuenta_Credito())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  //#region Chart Cuenta Credito

  const chartMonedaData = () => {
    const data = cuentas_credito.map(cuenta_credito => cuenta_credito.CodigoMoneda).sort((a, b) => a - b);

    const filteredData = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const labels = filteredData.map(cuenta_credito =>
      monedas
        .filter(moneda => moneda.Codigo === cuenta_credito)
        .map(moneda => moneda.Descripcion),
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartEstadoData = () => {
    const data = cuentas_credito.map(cuenta_credito => cuenta_credito.Estado === 'A' ? "Activo" : "Inactivo").sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartPagoData = () => {
    const pagoMinimoData = cuentas_credito.map(cuenta_credito => cuenta_credito.PagoMinimo);
    const pagoContadoData = cuentas_credito.map(cuenta_credito => cuenta_credito.PagoContado);
    const lineData = {
      labels: pagoMinimoData,
      datasets: [
        {
          label: "Pago Minimo",
          data: pagoMinimoData,
          backgroundColor: "White",
          borderColor: "#00c9ff",
          fill: false,
          tension: 0.1,
        },
        {
          label: "Pago Contado",
          data: pagoContadoData,
          backgroundColor: "White",
          borderColor: "#fc5c7d",
          fill: false,
          tension: 0.1,
        },
      ],
    };

    return lineData;
  };

  //#endregion Chart Cuenta Credito

  return (
    <>
      {isExport ? (
        <ExportCuentaCredito
          cuentas_credito={cuentas_credito}
          usuarios={usuarios}
          monedas={monedas}
          tarjetas={tarjetas}
          isExport={isExport}
          setIsExport={setIsExport}
        />
      ) : (
        <Page title="Cuentas Credito" className="TablePage">
          <Card className="mb-3">
            <CardBody>
              <Row>
                <Col>
                  <Table dark bordered>
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Usuario</th>
                        <th>Moneda</th>
                        <th>Tarjeta</th>
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
                      {cuentas_credito &&
                        cuentas_credito.map(cuenta_credito => {
                          return (
                            cuenta_credito.Estado === 'A' && (
                              <tr key={cuenta_credito && cuenta_credito.Codigo}>
                                <td>
                                  {cuenta_credito && cuenta_credito.Codigo}
                                </td>

                                {usuarios
                                  .filter(
                                    usuario =>
                                      usuario.Codigo ===
                                      cuenta_credito.CodigoUsuario,
                                  )
                                  .map(usuario => (
                                    <td key={usuario && usuario.Codigo}>{usuario && usuario.Nombre}</td>
                                  ))}

                                {monedas
                                  .filter(
                                    moneda =>
                                      moneda.Codigo ===
                                      cuenta_credito.CodigoMoneda,
                                  )
                                  .map(moneda => (
                                    <td key={moneda && moneda.Codigo}>{moneda && moneda.Descripcion}</td>
                                  ))}

                                {tarjetas
                                  .filter(
                                    tarjeta =>
                                      tarjeta.Codigo ===
                                      cuenta_credito.CodigoTarjeta,
                                  )
                                  .map(tarjeta => (
                                    <td key={tarjeta && tarjeta.Codigo}>{tarjeta && tarjeta.Numero}</td>
                                  ))}

                                <td>
                                  {cuenta_credito && cuenta_credito.Descripcion}
                                </td>
                                <td>{cuenta_credito && cuenta_credito.IBAN}</td>
                                <td>
                                  {cuenta_credito && cuenta_credito.Saldo}
                                </td>
                                <td>
                                  {cuenta_credito &&
                                    cuenta_credito.FechaPago.replaceAll(
                                      '-',
                                      '/',
                                    ).replace('T', ' ')}
                                </td>
                                <td>
                                  {cuenta_credito && cuenta_credito.PagoMinimo}
                                </td>
                                <td>
                                  {cuenta_credito && cuenta_credito.PagoContado}
                                </td>
                                <td>
                                  {cuenta_credito &&
                                  cuenta_credito.Estado === 'A'
                                    ? 'Activo'
                                    : 'Inactivo'}
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-info"
                                    onClick={() => {
                                      setCuenta_Credito(cuenta_credito);
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
                                      handleDeleteCuenta_Credito(cuenta_credito)
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
                <Col>
                  <BarChart
                    title="Cuentas Credito"
                    descripcion="Monedas más usadas en cuentas credito"
                    data={chartMonedaData}
                  />
                </Col>
                <Col>
                  <BarChart
                    title="Cuentas Credito"
                    descripcion="Estado de las cuentas credito"
                    data={chartEstadoData}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <LineChart
                    title="Cuentas Credito"
                    descripcion="Comparativa entre pago mínimo y contado"
                    data={chartPagoData}
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
        handlePostCuenta_Credito={handlePostCuenta_Credito}
        setModalInsert={setModalInsert}
        clearCuenta_Credito={clearCuenta_Credito}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        cuenta_credito={cuenta_credito}
        handleChange={handleChange}
        handlePutCuenta_Credito={handlePutCuenta_Credito}
        setModalUpdate={setModalUpdate}
        clearCuenta_Credito={clearCuenta_Credito}
      />
    </>
  );
};

export default Cuenta_Credito;
