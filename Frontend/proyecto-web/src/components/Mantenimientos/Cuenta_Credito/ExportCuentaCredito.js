import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardBody, Col, Row, Button, Table } from 'reactstrap';
import Page from 'components/Page';
import ExportExcel from './ExportExcel';
import { CSVLink } from 'react-csv';

import { useClipboard } from '../../../hooks/useClipboard';

const ContentToPrint = forwardRef((props, ref) => {
  const {
    cuentas_credito,
    usuarios,
    monedas,
    tarjetas,
    isExport,
    setIsExport,
    handlePrint,
  } = props;
  const { clipboard } = useClipboard();

  return (
    <Page title="Exportar Mantenimiento Cuenta Credito" className="TablePage">
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
                    <th>Descripción</th>
                    <th>IBAN</th>
                    <th>Saldo</th>
                    <th>Fecha de Pago</th>
                    <th>Pago Minimo</th>
                    <th>Pago Contado</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {cuentas_credito &&
                    cuentas_credito.map(cuenta_credito => {
                      return (
                        <tr key={cuenta_credito && cuenta_credito.Codigo}>
                          <td>{cuenta_credito && cuenta_credito.Codigo}</td>

                          {usuarios
                            .filter(
                              usuario =>
                                usuario.Codigo === cuenta_credito.CodigoUsuario,
                            )
                            .map(usuario => (
                              <td>{usuario && usuario.Nombre}</td>
                            ))}

                          {monedas
                            .filter(
                              moneda =>
                                moneda.Codigo === cuenta_credito.CodigoMoneda,
                            )
                            .map(moneda => (
                              <td>{moneda && moneda.Descripcion}</td>
                            ))}

                          {tarjetas
                            .filter(
                              tarjeta =>
                                tarjeta.Codigo === cuenta_credito.CodigoTarjeta,
                            )
                            .map(tarjeta => (
                              <td>{tarjeta && tarjeta.Numero}</td>
                            ))}

                          <td>
                            {cuenta_credito && cuenta_credito.Descripcion}
                          </td>
                          <td>{cuenta_credito && cuenta_credito.IBAN}</td>
                          <td>{cuenta_credito && cuenta_credito.Saldo}</td>
                          <td>
                            {cuenta_credito &&
                              cuenta_credito.FechaPago.replaceAll(
                                '-',
                                '/',
                              ).replace('T', ' ')}
                          </td>
                          <td>{cuenta_credito && cuenta_credito.PagoMinimo}</td>
                          <td>
                            {cuenta_credito && cuenta_credito.PagoContado}
                          </td>
                          <td>
                            {cuenta_credito && cuenta_credito.Estado === 'A'
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

              <ExportExcel cuentas_credito={cuentas_credito} />

              <CSVLink
                className="btn btn-info btn-lg btn-block"
                data={cuentas_credito}
                filename="Cuentas_Credito.csv"
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

const ExportCuentaCredito = ({
  cuentas_credito,
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
        cuentas_credito={cuentas_credito}
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

export default ExportCuentaCredito;
