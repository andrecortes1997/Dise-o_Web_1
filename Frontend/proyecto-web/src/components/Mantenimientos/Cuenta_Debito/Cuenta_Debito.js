import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import ExportCuentaDebito from './ExportCuentaDebito';

import { useMantenimientos } from '../../../hooks/useMantenimientos';
import ModalInsert from './ModalInsert.js';
import ModalUpdate from './ModalUpdate';
import BarChart from '../../ChartJS/BarChart';

const Cuenta_Debito = () => {
  const emptyCuenta_Debito = {
    CodigoUsuario: '',
    CodigoMoneda: '',
    CodigoTarjeta: '',
    Descripcion: '',
    IBAN: '',
    Saldo: '',
    Estado: 'A',
  };

  const { useUsuario, useMoneda, useTarjeta, useCuenta_Debito, useCharts } =
    useMantenimientos();
  const { usuarios } = useUsuario();
  const { monedas } = useMoneda();
  const { tarjetas } = useTarjeta();
  const {
    cuentas_debito,
    postCuenta_Debito,
    putCuenta_Debito,
    deleteCuenta_Debito,
  } = useCuenta_Debito();
  const [modalInsert, setModalInsert] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [cuenta_debito, setCuenta_Debito] = useState(emptyCuenta_Debito);
  const [isExport, setIsExport] = useState(false);

  const clearCuenta_Debito = () => {
    setCuenta_Debito({ ...emptyCuenta_Debito });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setCuenta_Debito(prevState => ({
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

  const handlePostCuenta_Debito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoTarjeta,
      Descripcion,
      IBAN,
      Saldo,
      Estado,
    } = cuenta_debito;

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
      : postCuenta_Debito(cuenta_debito)
          .then(() => setModalInsert(!modalInsert))
          .then(() => clearCuenta_Debito());
  };

  const handlePutCuenta_Debito = () => {
    const {
      CodigoUsuario,
      CodigoMoneda,
      CodigoTarjeta,
      Descripcion,
      IBAN,
      Saldo,
      Estado,
    } = cuenta_debito;

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
      : putCuenta_Debito(cuenta_debito)
          .then(() => setModalUpdate(!modalUpdate))
          .then(() => clearCuenta_Debito());
  };

  const handleDeleteCuenta_Debito = cuenta_debito => {
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
        deleteCuenta_Debito(cuenta_debito)
          .then(() => clearCuenta_Debito())
          .then(() => handleError(3))
          .catch(() => handleError(2));
      }
    });
  };

  //#region Chart Cuenta Debito

  const chartMonedaData = () => {
    const data = cuentas_debito.map(cuenta_debito => cuenta_debito.CodigoMoneda).sort((a, b) => a - b);

    const filteredData = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const labels = filteredData.map(cuenta_debito =>
      monedas
        .filter(moneda => moneda.Codigo === cuenta_debito)
        .map(moneda => moneda.Descripcion),
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartEstadoData = () => {
    const data = cuentas_debito.map(cuenta_debito => cuenta_debito.Estado === 'A' ? "Activo" : "Inactivo").sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  //#endregion Chart Cuenta Debito

  return (
    <>
      {isExport ? (
        <ExportCuentaDebito
          cuentas_debito={cuentas_debito}
          usuarios={usuarios}
          monedas={monedas}
          tarjetas={tarjetas}
          isExport={isExport}
          setIsExport={setIsExport}
        />
      ) : (
        <Page title="Cuentas Debito" className="TablePage">
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
                        <th>Descripcion</th>
                        <th>IBAN</th>
                        <th>Saldo</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cuentas_debito &&
                        cuentas_debito.map(cuenta_debito => {
                          return (
                            cuenta_debito.Estado === 'A' && (
                              <tr key={cuenta_debito && cuenta_debito.Codigo}>
                                <td>{cuenta_debito && cuenta_debito.Codigo}</td>

                                {usuarios
                                  .filter(
                                    usuario =>
                                      usuario.Codigo ===
                                      cuenta_debito.CodigoUsuario,
                                  )
                                  .map(usuario => (
                                    <td key={usuario && usuario.Codigo}>
                                      {usuario && usuario.Nombre}
                                    </td>
                                  ))}

                                {monedas
                                  .filter(
                                    moneda =>
                                      moneda.Codigo ===
                                      cuenta_debito.CodigoMoneda,
                                  )
                                  .map(moneda => (
                                    <td key={moneda && moneda.Codigo}>
                                      {moneda && moneda.Descripcion}
                                    </td>
                                  ))}

                                {tarjetas
                                  .filter(
                                    tarjeta =>
                                      tarjeta.Codigo ===
                                      cuenta_debito.CodigoTarjeta,
                                  )
                                  .map(tarjeta => (
                                    <td key={tarjeta && tarjeta.Codigo}>
                                      {tarjeta && tarjeta.Numero}
                                    </td>
                                  ))}

                                <td>
                                  {cuenta_debito && cuenta_debito.Descripcion}
                                </td>
                                <td>{cuenta_debito && cuenta_debito.IBAN}</td>
                                <td>{cuenta_debito && cuenta_debito.Saldo}</td>
                                <td>
                                  {cuenta_debito && cuenta_debito.Estado === 'A'
                                    ? 'Activo'
                                    : 'Inactivo'}
                                </td>
                                <td>
                                  <Button
                                    className="btn btn-info"
                                    onClick={() => {
                                      setCuenta_Debito(cuenta_debito);
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
                                      handleDeleteCuenta_Debito(cuenta_debito)
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
                    title="Cuentas Debito"
                    descripcion="Monedas más usadas en cuentas debito"
                    data={chartMonedaData}
                  />
                </Col>
                <Col>
                  <BarChart
                    title="Cuentas Debito"
                    descripcion="Estado de las cuentas debito"
                    data={chartEstadoData}
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
        handlePostCuenta_Debito={handlePostCuenta_Debito}
        setModalInsert={setModalInsert}
        clearCuenta_Debito={clearCuenta_Debito}
      />

      <ModalUpdate
        modalUpdate={modalUpdate}
        cuenta_debito={cuenta_debito}
        handleChange={handleChange}
        handlePutCuenta_Debito={handlePutCuenta_Debito}
        setModalUpdate={setModalUpdate}
        clearCuenta_Debito={clearCuenta_Debito}
      />
    </>
  );
};

export default Cuenta_Debito;
