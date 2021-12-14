import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardBody, Col, Row, Button, Table } from 'reactstrap';
import Page from 'components/Page';
import ExportExcel from './ExportExcel';
import { CSVLink } from 'react-csv';

import { useClipboard } from '../../../hooks/useClipboard';

const ContentToPrint = forwardRef((props, ref) => {
  const { estadisticas, usuarios, isExport, setIsExport, handlePrint } = props;
  const { clipboard } = useClipboard();

  return (
    <Page title="Exportar Mantenimiento Estadistica" className="TablePage">
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
            <Table dark bordered innerRef={ref}>
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Usuario</th>
                        <th>Fecha y Hora</th>
                        <th>Navegador</th>
                        <th>Plataforma del Dispositivo</th>
                        <th>Fabricante del Dispositivo</th>
                        <th>Vista</th>
                        <th>Acción</th>
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
                                  <td>{usuario && usuario.Nombre}</td>
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
                className="btn btn-info btn-lg btn-block"
                onClick={handlePrint}
              >
                Exportar a PDF
              </Button>

              <ExportExcel estadisticas={estadisticas} />

              <CSVLink
                className="btn btn-info btn-lg btn-block"
                data={estadisticas}
                filename="Estadisticas.csv"
              >
                Exportar a CSV
              </CSVLink>

              <Button
                className="btn btn-info btn-lg btn-block"
                onClick={() => clipboard()}
              >
                Copiar al Portapapeles
              </Button>

              <Button
                className="btn btn-primary btn-lg btn-block"
                onClick={() => setIsExport(!isExport)}
              >
                Volver
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Page>
  );
});

const ExportSesion = ({ estadisticas, usuarios, isExport, setIsExport }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsExport(!isExport),
  });

  return (
    <div>
      <ContentToPrint
        estadisticas={estadisticas}
        usuarios={usuarios}
        isExport={isExport}
        setIsExport={setIsExport}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default ExportSesion;