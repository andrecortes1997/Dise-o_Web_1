import Page from 'components/Page';
import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Table, Button } from 'reactstrap';
import ExportSesion from './ExportSesion';
import DoughnutChart from '../../ChartJS/DoughnutChart';

import { useMantenimientos } from '../../../hooks/useMantenimientos';

const Sesion = () => {
  const { useSesion, useUsuario, useCharts } = useMantenimientos();
  const { usuarios } = useUsuario();
  const { sesiones } = useSesion();
  const [isExport, setIsExport] = useState(false);

  //#region Chart Sesion

  const chartUsuarioData = () => {
    const data = sesiones
      .map(sesion => sesion.CodigoUsuario)
      .sort((a, b) => a - b);

    const filteredData = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const labels = filteredData.map(sesion =>
      usuarios
        .filter(usuario => usuario.Codigo === sesion)
        .map(usuario => usuario.Nombre),
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  //#endregion Chart Sesion

  return (
    <>
      {isExport ? (
        <ExportSesion
          sesiones={sesiones}
          usuarios={usuarios}
          isExport={isExport}
          setIsExport={setIsExport}
        />
      ) : (
        <Page title="Sesiones" className="TablePage">
          <Card className="mb-3">
            <CardBody>
              <Row>
                <Col>
                  <Table dark bordered>
                    <thead>
                      <tr>
                        <th>Codigo</th>
                        <th>Usuario</th>
                        <th>Fecha de Inicio</th>
                        <th>Fecha de Expiracion</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sesiones &&
                        sesiones.map(sesion => {
                          return (
                            sesion.Estado === 'A' && (
                              <tr key={sesion && sesion.Codigo}>
                                <td>{sesion && sesion.Codigo}</td>
                                {usuarios
                                  .filter(
                                    usuario =>
                                      usuario.Codigo === sesion.CodigoUsuario,
                                  )
                                  .map(usuario => (
                                    <td key={usuario && usuario.Codigo}>
                                      {usuario && usuario.Nombre}
                                    </td>
                                  ))}
                                <td>
                                  {sesion &&
                                    sesion.FechaInicio.replaceAll(
                                      '-',
                                      '/',
                                    ).replace('T', ' ')}
                                </td>
                                <td>
                                  {sesion &&
                                    sesion.FechaExpiracion.replaceAll(
                                      '-',
                                      '/',
                                    ).replace('T', ' ')}
                                </td>
                                <td>
                                  {sesion && sesion.Estado === 'A'
                                    ? 'Activo'
                                    : 'Inactivo'}
                                </td>
                              </tr>
                            )
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
                <DoughnutChart
                  title="Sesiones"
                  descripcion="Usuarios más frecuentes"
                  data={chartUsuarioData}
                />
              </Row>
            </CardBody>
          </Card>
        </Page>
      )}
    </>
  );
};

export default Sesion;
