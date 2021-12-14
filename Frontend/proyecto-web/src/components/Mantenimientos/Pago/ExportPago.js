import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardBody, Col, Row, Button, Table } from 'reactstrap';
import Page from 'components/Page';
import ExportExcel from "./ExportExcel";
import { CSVLink } from "react-csv";

import { useClipboard } from '../../../hooks/useClipboard';

const ContentToPrint = forwardRef((props, ref) => {
  const { pagos, usuarios, servicios, tarjetas, isExport, setIsExport, handlePrint } = props;
  const { clipboard } = useClipboard();

  return (
    <Page title="Exportar Mantenimiento Pago" className="TablePage">
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
            <Table dark bordered innerRef={ref}>
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Usuario</th>
                        <th>Servicio</th>
                        <th>Tarjeta</th>
                        <th>Descripción</th>
                        <th>Fecha y hora</th>
                        <th>Monto</th>
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
                                  <td>{usuario && usuario.Nombre}</td>
                                ))}

                              {servicios
                                .filter(
                                  servicio =>
                                    servicio.Codigo === pago.CodigoServicio,
                                )
                                .map(servicio => (
                                  <td>{servicio && servicio.Descripcion}</td>
                                ))}

                              {tarjetas
                                .filter(
                                  tarjeta =>
                                    tarjeta.Codigo === pago.CodigoTarjeta,
                                )
                                .map(tarjeta => (
                                  <td>{tarjeta && tarjeta.Numero}</td>
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

              <ExportExcel pagos={pagos} />

              <CSVLink
                className="btn btn-info btn-lg btn-block"
                data={pagos}
                filename="Pagos.csv"
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

const ExportPago = ({ pagos, usuarios, servicios, tarjetas, isExport, setIsExport }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsExport(!isExport),
  });

  return (
    <div>
      <ContentToPrint
        pagos={pagos}
        usuarios={usuarios}
        servicios={servicios}
        tarjetas={tarjetas}
        isExport={isExport}
        setIsExport={setIsExport}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default ExportPago;