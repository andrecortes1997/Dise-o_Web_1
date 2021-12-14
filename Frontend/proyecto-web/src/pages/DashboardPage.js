import Page from 'components/Page';
import UserProgressTable from 'components/UserProgressTable';
import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'demos/dashboardPage';
import React, { useEffect } from 'react';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';

import BarChart from '../components/ChartJS/BarChart';
import DoughnutChart from '../components/ChartJS/DoughnutChart';
import LineChart from '../components/ChartJS/LineChart';
import PieChart from '../components/ChartJS/PieChart';

import { useMantenimientos } from '../hooks/useMantenimientos';

const DashboardPage = () => {
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7,
  );

  const infoColor = getColor('info');
  const secondaryColor = getColor('secondary');

  const {
    usePago,
    useCharts,
    useSesion,
    useMoneda,
    useUsuario,
    useTarjeta,
    useServicio,
    useEstadistica,
    useTransferencia,
    useCuenta_Debito,
    useCuenta_Credito,
  } = useMantenimientos();
  const { pagos } = usePago();
  const { usuarios } = useUsuario();
  const { servicios } = useServicio();
  const { tarjetas } = useTarjeta();
  const { transferencias } = useTransferencia();
  const { estadisticas } = useEstadistica();
  const { sesiones } = useSesion();
  const { monedas } = useMoneda();
  const { cuentas_debito } = useCuenta_Debito();
  const { cuentas_credito } = useCuenta_Credito();

  useEffect(() => {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }, []);

  //#region Graficos

  //#region Chart Pago

  const chartUsuarioData = () => {
    const data = pagos.map(pago => pago.CodigoUsuario).sort((a, b) => a - b);

    const filteredData = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const labels = filteredData.map(pago =>
      usuarios
        .filter(usuario => usuario.Codigo === pago)
        .map(usuario => usuario.Nombre),
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartServicioData = () => {
    const data = pagos.map(pago => pago.CodigoServicio).sort((a, b) => a - b);

    const filteredData = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const labels = filteredData.map(pago =>
      servicios
        .filter(servicio => servicio.Codigo === pago)
        .map(servicio => servicio.Descripcion),
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  //#endregion Chart Pago

  //#region Chart Tarjeta

  const chartUsuarioTarjetaData = () => {
    const data = tarjetas
      .map(tarjeta => tarjeta.CodigoUsuario)
      .sort((a, b) => a - b);

    const filteredData = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const labels = filteredData.map(tarjeta =>
      usuarios
        .filter(usuario => usuario.Codigo === tarjeta)
        .map(usuario => usuario.Nombre),
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartTarjetaData = () => {
    const data = tarjetas
      .map(tarjeta => tarjeta.Descripcion)
      .sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  //#endregion Chart Tarjeta

  //#region Chart Transferencia

  const chartMontoData = () => {
    const data = transferencias
      .map(transferencia => transferencia.Monto)
      .sort((a, b) => a - b);
    const lineData = {
      labels: data,
      datasets: [
        {
          data: data,
          backgroundColor: 'White',
          borderColor: '#00c9ff',
          fill: false,
          tension: 0.1,
        },
      ],
    };

    return lineData;
  };

  //#endregion Chart Transferencia

  //#region Chart Estadistica

  const chartNavegadorData = () => {
    const data = estadisticas
      .map(sesion => sesion.Navegador)
      .sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartPlataformaData = () => {
    const data = estadisticas
      .map(sesion => sesion.PlataformaDispositivo)
      .sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartVistaData = () => {
    const data = estadisticas.map(sesion => sesion.Vista).sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartAccionData = () => {
    const data = estadisticas
      .map(sesion => sesion.Accion)
      .sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  //#endregion Chart Estadistica

  //#region Chart Sesion

  const chartUsuarioSesionData = () => {
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

  //#region Chart Cuenta Debito

  const chartMonedaDebitoData = () => {
    const data = cuentas_debito.map(cuenta_debito => cuenta_debito.CodigoMoneda).sort((a, b) => a - b);

    const filteredData = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const labels = filteredData.map(cuenta_debito =>
      monedas
        .filter(moneda => moneda.Codigo === cuenta_debito)
        .map(moneda => moneda.Descripcion),
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartEstadoDebitoData = () => {
    const data = cuentas_debito.map(cuenta_debito => cuenta_debito.Estado === 'A' ? "Activo" : "Inactivo").sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  //#endregion Chart Cuenta Debito

  //#region Chart Cuenta Credito

  const chartMonedaCreditoData = () => {
    const data = cuentas_credito.map(cuenta_credito => cuenta_credito.CodigoMoneda).sort((a, b) => a - b);

    const filteredData = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const labels = filteredData.map(cuenta_credito =>
      monedas
        .filter(moneda => moneda.Codigo === cuenta_credito)
        .map(moneda => moneda.Descripcion),
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartEstadoCreditoData = () => {
    const data = cuentas_credito.map(cuenta_credito => cuenta_credito.Estado === 'A' ? "Activo" : "Inactivo").sort((a, b) => a - b);

    const labels = data.filter(
      (item, index, arr) => arr.indexOf(item) === index,
    );

    const doughnutPiePago = useCharts(data, labels);
    return doughnutPiePago.getChartData();
  };

  const chartPagoCreditoData = () => {
    const pagoMinimoData = cuentas_credito.map(cuenta_credito => cuenta_credito.PagoMinimo);
    const pagoContadoData = cuentas_credito.map(cuenta_credito => cuenta_credito.PagoContado);
    const lineData = {
      labels: pagoMinimoData,
      datasets: [
        {
          label: "Pago Minimo",
          data: pagoMinimoData,
          backgroundColor: "White",
          borderColor: "#00c9ff",
          fill: false,
          tension: 0.1,
        },
        {
          label: "Pago Contado",
          data: pagoContadoData,
          backgroundColor: "White",
          borderColor: "#fc5c7d",
          fill: false,
          tension: 0.1,
        },
      ],
    };

    return lineData;
  };

  //#endregion Chart Cuenta Credito

  //#endregion

  return (
    <Page className="DashboardPage" title="Dashboard">
      <Row>
        <Col md="4" sm="12" xs="12">
          <InfiniteCalendar
            selected={today}
            minDate={lastWeek}
            width="100%"
            theme={{
              accentColor: infoColor,
              floatingNav: {
                background: secondaryColor,
                chevron: infoColor,
                color: '#FFF',
              },
              headerColor: secondaryColor,
              selectionColor: infoColor,
              textColor: {
                active: '#FFF',
                default: '#333',
              },
              todayColor: infoColor,
              weekdayColor: secondaryColor,
            }}
          />
        </Col>
        <Col md="8" sm="12" xs="12">
          <Card>
            <CardHeader>Usuarios</CardHeader>
            <CardBody>
              <UserProgressTable
                headers={[
                  <MdPersonPin size={25} />,
                  'name',
                  'date',
                  'participation',
                  '%',
                ]}
                usersData={userProgressTableData}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Page className="DashboardPage" title="Gráficos - ChartJS">
        <Card>
          <CardBody>
            <Row>
              <Col>
                <DoughnutChart
                  title="Estadísticas"
                  descripcion="Navegador más usado"
                  data={chartNavegadorData}
                />
              </Col>
              <Col>
                <DoughnutChart
                  title="Estadísticas"
                  descripcion="Plataforma más usada"
                  data={chartPlataformaData}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <DoughnutChart
                  title="Estadísticas"
                  descripcion="Vista más ingresada"
                  data={chartVistaData}
                />
              </Col>
              <Col>
                <DoughnutChart
                  title="Estadísticas"
                  descripcion="Acción más realizada"
                  data={chartAccionData}
                />
              </Col>
            </Row>

            <Row>
              <DoughnutChart
                title="Sesiones"
                descripcion="Usuarios más frecuentes"
                data={chartUsuarioSesionData}
              />
            </Row>

            <Row>
              <Col>
                <BarChart
                  title="Pagos"
                  descripcion="Usuarios más frecuentes"
                  data={chartUsuarioData}
                />
              </Col>
              <Col>
                <BarChart
                  title="Pagos"
                  descripcion="Servicios más pagados"
                  data={chartServicioData}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <PieChart
                  title="Tarjetas"
                  descripcion="Usuarios con más tarjetas"
                  data={chartUsuarioTarjetaData}
                />
              </Col>
              <Col>
                <PieChart
                  title="Tarjetas"
                  descripcion="Tipo de tarjeta más utilizada"
                  data={chartTarjetaData}
                />
              </Col>
            </Row>

            <Row>
              <LineChart
                title="Transferencias"
                descripcion="Comparativa de montos transferidos entre cuentas"
                data={chartMontoData}
              />
            </Row>

            <Row>
                <Col>
                  <BarChart
                    title="Cuentas Debito"
                    descripcion="Monedas más usadas en cuentas debito"
                    data={chartMonedaDebitoData}
                  />
                </Col>
                <Col>
                  <BarChart
                    title="Cuentas Debito"
                    descripcion="Estado de las cuentas debito"
                    data={chartEstadoDebitoData}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <BarChart
                    title="Cuentas Credito"
                    descripcion="Monedas más usadas en cuentas credito"
                    data={chartMonedaCreditoData}
                  />
                </Col>
                <Col>
                  <BarChart
                    title="Cuentas Credito"
                    descripcion="Estado de las cuentas credito"
                    data={chartEstadoCreditoData}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <LineChart
                    title="Cuentas Credito"
                    descripcion="Comparativa entre pago mínimo y contado"
                    data={chartPagoCreditoData}
                  />
                </Col>
              </Row>
          </CardBody>
        </Card>
      </Page>
    </Page>
  );
};

export default DashboardPage;
