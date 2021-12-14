import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardBody, Col, Row, Button, Table } from 'reactstrap';
import Page from 'components/Page';
import ExportExcel from './ExportExcel';
import { CSVLink } from 'react-csv';

import { useClipboard } from '../../../hooks/useClipboard';

const ContentToPrint = forwardRef((props, ref) => {
  const { servicios, isExport, setIsExport, handlePrint } = props;
  const { clipboard } = useClipboard();

  return (
    <Page title="Exportar Mantenimiento Servicio" className="TablePage">
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
              <Table dark bordered innerRef={ref}>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios &&
                    servicios.map(servicio => {
                      return (
                        <tr key={servicio && servicio.Codigo}>
                          <td>{servicio && servicio.Codigo}</td>
                          <td>{servicio && servicio.Descripcion}</td>
                          <td>
                            {servicio && servicio.Estado === 'A'
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

              <ExportExcel servicios={servicios} />

              <CSVLink
                className="btn btn-info btn-lg btn-block"
                data={servicios}
                filename="Servicios.csv"
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

const ExportServicio = ({ servicios, isExport, setIsExport }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsExport(!isExport),
  });

  return (
    <div>
      <ContentToPrint
        servicios={servicios}
        isExport={isExport}
        setIsExport={setIsExport}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default ExportServicio;
