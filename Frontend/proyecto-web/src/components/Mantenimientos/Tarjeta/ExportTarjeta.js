import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardBody, Col, Row, Button, Table } from 'reactstrap';
import Page from 'components/Page';
import ExportExcel from './ExportExcel';
import { CSVLink } from 'react-csv';

import { useClipboard } from '../../../hooks/useClipboard';

const ContentToPrint = forwardRef((props, ref) => {
  const { tarjetas, usuarios, isExport, setIsExport, handlePrint } = props;
  const { clipboard } = useClipboard();

  return (
    <Page title="Exportar Mantenimiento Tarjeta" className="TablePage">
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
              <Table dark bordered innerRef={ref}>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Usuario</th>
                    <th>Descripción</th>
                    <th>Número de Tarjeta</th>
                    <th>CVC</th>
                    <th>Fecha de Vencimiento</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {tarjetas &&
                    tarjetas.map(tarjeta => {
                      return (
                        <tr key={tarjeta && tarjeta.Codigo}>
                          <td>{tarjeta && tarjeta.Codigo}</td>

                          {usuarios
                            .filter(
                              usuario =>
                                usuario.Codigo === tarjeta.CodigoUsuario,
                            )
                            .map(usuario => (
                              <td>{usuario && usuario.Nombre}</td>
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

              <ExportExcel tarjetas={tarjetas} />

              <CSVLink
                className="btn btn-info btn-lg btn-block"
                data={tarjetas}
                filename="Tarjetas.csv"
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

const ExportTarjeta = ({ tarjetas, usuarios, isExport, setIsExport }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsExport(!isExport),
  });

  return (
    <div>
      <ContentToPrint
        tarjetas={tarjetas}
        usuarios={usuarios}
        isExport={isExport}
        setIsExport={setIsExport}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default ExportTarjeta;
