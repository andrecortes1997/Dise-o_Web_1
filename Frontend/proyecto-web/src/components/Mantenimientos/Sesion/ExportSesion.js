import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardBody, Col, Row, Button, Table } from 'reactstrap';
import Page from 'components/Page';
import ExportExcel from './ExportExcel';
import { CSVLink } from 'react-csv';

import { useClipboard } from '../../../hooks/useClipboard';

const ContentToPrint = forwardRef((props, ref) => {
  const { sesiones, usuarios, isExport, setIsExport, handlePrint } = props;
  const { clipboard } = useClipboard();

  return (
    <Page title="Exportar Mantenimiento Sesion" className="TablePage">
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
              <Table dark bordered innerRef={ref}>
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
                        <tr key={sesion && sesion.Codigo}>
                          <td>{sesion && sesion.Codigo}</td>
                          {usuarios
                            .filter(
                              usuario =>
                                usuario.Codigo === sesion.CodigoUsuario,
                            )
                            .map(usuario => (
                              <td>{usuario && usuario.Nombre}</td>
                            ))}
                          <td>
                            {sesion &&
                              sesion.FechaInicio.replaceAll('-', '/').replace(
                                'T',
                                ' ',
                              )}
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

              <ExportExcel sesiones={sesiones} />

              <CSVLink
                className="btn btn-info btn-lg btn-block"
                data={sesiones}
                filename="Sesiones.csv"
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

const ExportSesion = ({ sesiones, usuarios, isExport, setIsExport }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsExport(!isExport),
  });

  return (
    <div>
      <ContentToPrint
        sesiones={sesiones}
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
