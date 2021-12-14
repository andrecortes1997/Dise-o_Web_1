import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardBody, Col, Row, Button, Table } from 'reactstrap';
import Page from 'components/Page';
import ExportExcel from './ExportExcel';
import { CSVLink } from 'react-csv';

import { useClipboard } from '../../../hooks/useClipboard';

const ContentToPrint = forwardRef((props, ref) => {
  const { transferencias, isExport, setIsExport, handlePrint } = props;
  const { clipboard } = useClipboard();

  return (
    <Page title="Exportar Mantenimiento Transferencia" className="TablePage">
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
              <Table dark bordered innerRef={ref}>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Cuenta de Origen</th>
                    <th>Cuenta de Destino</th>
                    <th>Fecha y Hora</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {transferencias &&
                    transferencias.map(transferencia => {
                      return (
                        <tr key={transferencia && transferencia.Codigo}>
                          <td>{transferencia && transferencia.Codigo}</td>
                          <td>{transferencia && transferencia.CuentaOrigen}</td>
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
                          <td>{transferencia && transferencia.Descripcion}</td>
                          <td>{transferencia && transferencia.Monto}</td>
                          <td>
                            {transferencia && transferencia.Estado === 'A'
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

              <ExportExcel transferencias={transferencias} />

              <CSVLink
                className="btn btn-info btn-lg btn-block"
                data={transferencias}
                filename="Transferencias.csv"
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

const ExportTransferencia = ({ transferencias, isExport, setIsExport }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsExport(!isExport),
  });

  return (
    <div>
      <ContentToPrint
        transferencias={transferencias}
        isExport={isExport}
        setIsExport={setIsExport}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default ExportTransferencia;
