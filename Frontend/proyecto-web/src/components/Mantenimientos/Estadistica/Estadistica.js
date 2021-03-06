import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import ExportEstadistica from './ExportEstadistica';
import DoughnutChart from '../../ChartJS/DoughnutChart';

import { useMantenimientos } from '../../../hooks/useMantenimientos';

const Estadistica = () => {
  const { useUsuario, useEstadistica, useCharts } = useMantenimientos();
  const { estadisticas } = useEstadistica();
  const { usuarios } = useUsuario();
  const [isExport, setIsExport] = useState(false);

  //#region Chart Estadistica

  const chartNavegadorData = () => {
    const data = estadisticas
      .map(sesion => sesion.Navegador)
      .sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartPlataformaData = () => {
    const data = estadisticas
      .map(sesion => sesion.PlataformaDispositivo)
      .sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartVistaData = () => {
    const data = estadisticas
      .map(sesion => sesion.Vista)
      .sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartAccionData = () => {
    const data = estadisticas
      .map(sesion => sesion.Accion)
      .sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  //#endregion Chart Estadistica

  return (
    <>
      {isExport ? (
        <ExportEstadistica
          estadisticas={estadisticas}
          usuarios={usuarios}
          isExport={isExport}
          setIsExport={setIsExport}
        />
      ) : (
        <Page title="Estadisticas" className="TablePage">
          <Card className="mb-3">
            <CardBody>
              <Row>
                <Col>
                  <Table dark bordered>
                    <thead>
                      <tr>
                        <th>C??digo</th>
                        <th>Usuario</th>
                        <th>Fecha y Hora</th>
                        <th>Navegador</th>
                        <th>Plataforma del Dispositivo</th>
                        <th>Fabricante del Dispositivo</th>
                        <th>Vista</th>
                        <th>Acci??n</th>
                      </tr>
                    </thead>
                    <tbody>
                      {estadisticas &&
                        estadisticas.map(estadistica => {
                          return (
                            <tr key={estadistica && estadistica.Codigo}>
                              <td>{estadistica && estadistica.Codigo}</td>
                              {usuarios
                                .filter(
                                  usuario =>
                                    usuario.Codigo ===
                                    estadistica.CodigoUsuario,
                                )
                                .map(usuario => (
                                  <td key={usuario && usuario.Codigo}>{usuario && usuario.Nombre}</td>
                                ))}
                              <td>
                                {estadistica &&
                                  estadistica.FechaHora.replaceAll(
                                    '-',
                                    '/',
                                  ).replace('T', ' ')}
                              </td>
                              <td>{estadistica && estadistica.Navegador}</td>
                              <td>
                                {estadistica &&
                                  estadistica.PlataformaDispositivo}
                              </td>
                              <td>
                                {estadistica &&
                                estadistica.FabricanteDispositivo === 'none'
                                  ? 'Sin Fabricante'
                                  : estadistica.FabricanteDispositivo}
                              </td>
                              <td>{estadistica && estadistica.Vista}</td>
                              <td>{estadistica && estadistica.Accion}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
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
                <DoughnutChart
                  title="Estad??sticas"
                  descripcion="Navegador m??s usado"
                  data={chartNavegadorData}
                />
                </Col>
                <Col>
                <DoughnutChart
                  title="Estad??sticas"
                  descripcion="Plataforma m??s usada"
                  data={chartPlataformaData}
                /> 
                </Col>
              </Row>
              <Row>
              <Col>
                <DoughnutChart
                  title="Estad??sticas"
                  descripcion="Vista m??s ingresada"
                  data={chartVistaData}
                />
                </Col>
                <Col>
                <DoughnutChart
                  title="Estad??sticas"
                  descripcion="Acci??n m??s realizada"
                  data={chartAccionData}
                /> 
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Page>
      )}
    </>
  );
};

export default Estadistica;
