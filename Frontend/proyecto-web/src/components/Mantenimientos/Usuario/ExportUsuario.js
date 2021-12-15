import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardBody, Col, Row, Button, Table } from 'reactstrap';
import Page from 'components/Page';
import ExportExcel from './ExportExcel';
import { CSVLink } from 'react-csv';

import { useClipboard } from '../../../hooks/useClipboard';

const ContentToPrint = forwardRef((props, ref) => {
  const { usuarios, isExport, setIsExport, handlePrint } = props;
  const { clipboard } = useClipboard();

  return (
    <Page title="Exportar Mantenimiento Usuario" className="TablePage">
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col>
              <Table dark bordered innerRef={ref}>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Identificación</th>
                    <th>Nombre Completo</th>
                    <th>Nombre de Usuario</th>
                    <th>Contraseña</th>
                    <th>Correo</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios &&
                    usuarios.map(usuario => {
                      return (
                        <tr key={usuario && usuario.Codigo}>
                          <td>{usuario && usuario.Codigo}</td>
                          <td>{usuario && usuario.Identificacion}</td>
                          <td>{usuario && usuario.Nombre}</td>
                          <td>{usuario && usuario.Username}</td>
                          <td>{usuario && usuario.Password}</td>
                          <td>{usuario && usuario.Email}</td>
                          <td>
                            {usuario &&
                              usuario.FechaNacimiento.replaceAll(
                                '-',
                                '/',
                              ).replace('T', ' ')}
                          </td>
                          <td>
                            {usuario && usuario.Estado === 'A'
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

              <ExportExcel usuarios={usuarios} />

              <CSVLink
                className="btn btn-info btn-lg btn-block"
                data={usuarios}
                filename="Usuarios.csv"
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

const ExportUsuario = ({
  usuarios,
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
        usuarios={usuarios}
        isExport={isExport}
        setIsExport={setIsExport}
        handlePrint={handlePrint}
        ref={componentRef}
      />
    </div>
  );
};

export default ExportUsuario;
