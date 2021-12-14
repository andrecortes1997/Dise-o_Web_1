import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardBody, Col, Row, Button, Table } from 'reactstrap';
import Page from 'components/Page';
import ExportExcel from './ExportExcel';
import { CSVLink } from 'react-csv';

import { useClipboard } from '../../../hooks/useClipboard';

const ContentToPrint = forwardRef((props, ref) => {
  const {
    cuentas_debito,
    usuarios,
    monedas,
    tarjetas,
    isExport,
    setIsExport,
    handlePrint,
  } = props;
  const { clipboard } = useClipboard();

  return (
    <Page title="Exportar Mantenimiento Cuenta Debito" className="TablePage">
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
              <Table dark bordered innerRef={ref}>
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
                  </tr>
                </thead>
                <tbody>
                  {cuentas_debito &&
                    cuentas_debito.map(cuenta_debito => {
                      return (
                        <tr key={cuenta_debito && cuenta_debito.Codigo}>
                          <td>{cuenta_debito && cuenta_debito.Codigo}</td>

                          {usuarios
                            .filter(
                              usuario =>
                                usuario.Codigo === cuenta_debito.CodigoUsuario,
                            )
                            .map(usuario => (
                              <td>{usuario && usuario.Nombre}</td>
                            ))}

                          {monedas
                            .filter(
                              moneda =>
                                moneda.Codigo === cuenta_debito.CodigoMoneda,
                            )
                            .map(moneda => (
                              <td>{moneda && moneda.Descripcion}</td>
                            ))}

                          {tarjetas
                            .filter(
                              tarjeta =>
                                tarjeta.Codigo === cuenta_debito.CodigoTarjeta,
                            )
                            .map(tarjeta => (
                              <td>{tarjeta && tarjeta.Numero}</td>
                            ))}

                          <td>{cuenta_debito && cuenta_debito.Descripcion}</td>
                          <td>{cuenta_debito && cuenta_debito.IBAN}</td>
                          <td>{cuenta_debito && cuenta_debito.Saldo}</td>
                          <td>
                            {cuenta_debito && cuenta_debito.Estado === 'A'
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

              <ExportExcel cuentas_debito={cuentas_debito} />

              <CSVLink
                className="btn btn-info btn-lg btn-block"
                data={cuentas_debito}
                filename="Cuentas_Debito.csv"
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

const ExportCuentaDebito = ({
  cuentas_debito,
  usuarios,
  monedas,
  tarjetas,
  isExport,
  setIsExport,
}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setIsExport(!isExport),
  });

  return (
    <div>
      <ContentToPrint
        cuentas_debito={cuentas_debito}
        usuarios={usuarios}
        monedas={monedas}
        tarjetas={tarjetas}
        isExport={isExport}
        setIsExport={setIsExport}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default ExportCuentaDebito;
