//import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import Login from 'pages/Login';
import Register from 'pages/Register';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const AlertPage = React.lazy(() => import('pages/AlertPage'));
const AuthModalPage = React.lazy(() => import('pages/AuthModalPage'));
const BadgePage = React.lazy(() => import('pages/BadgePage'));
const ButtonGroupPage = React.lazy(() => import('pages/ButtonGroupPage'));
const ButtonPage = React.lazy(() => import('pages/ButtonPage'));
const CardPage = React.lazy(() => import('pages/CardPage'));
const ChartPage = React.lazy(() => import('pages/ChartPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const DropdownPage = React.lazy(() => import('pages/DropdownPage'));
const FormPage = React.lazy(() => import('pages/FormPage'));
const InputGroupPage = React.lazy(() => import('pages/InputGroupPage'));
const ModalPage = React.lazy(() => import('pages/ModalPage'));
const ProgressPage = React.lazy(() => import('pages/ProgressPage'));
const TypographyPage = React.lazy(() => import('pages/TypographyPage'));
const WidgetPage = React.lazy(() => import('pages/WidgetPage'));

// Mantenimientos

const Usuario = React.lazy(() =>
  import('./components/Mantenimientos/Usuario/Usuario'),
);
const Moneda = React.lazy(() =>
  import('./components/Mantenimientos/Moneda/Moneda'),
);
const Servicio = React.lazy(() =>
  import('./components/Mantenimientos/Servicio/Servicio'),
);
const Pago = React.lazy(() => import('./components/Mantenimientos/Pago/Pago'));
const Sesion = React.lazy(() =>
  import('./components/Mantenimientos/Sesion/Sesion'),
);
const Estadistica = React.lazy(() =>
  import('./components/Mantenimientos/Estadistica/Estadistica'),
);
const Tarjeta = React.lazy(() =>
  import('./components/Mantenimientos/Tarjeta/Tarjeta'),
);
const Transferencia = React.lazy(() =>
  import('./components/Mantenimientos/Transferencia/Transferencia'),
);
const Cuenta_Debito = React.lazy(() =>
  import('./components/Mantenimientos/Cuenta_Debito/Cuenta_Debito'),
);
const Cuenta_Credito = React.lazy(() =>
  import('./components/Mantenimientos/Cuenta_Credito/Cuenta_Credito'),
);

/* Routes */

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => <Login {...props} />}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => <Register {...props} />}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/usuarios" component={Usuario} />

                <Route exact path="/monedas" component={Moneda} />
                <Route exact path="/servicios" component={Servicio} />
                <Route exact path="/pagos" component={Pago} />
                <Route exact path="/sesiones" component={Sesion} />
                <Route exact path="/estadisticas" component={Estadistica} />
                <Route exact path="/tarjetas" component={Tarjeta} />
                <Route exact path="/transferencias" component={Transferencia} />
                <Route exact path="/cuentas_debito" component={Cuenta_Debito} />
                <Route
                  exact
                  path="/cuentas_credito"
                  component={Cuenta_Credito}
                />

                {/* <Route exact path="/login-modal" component={AuthModalPage} />
                <Route exact path="/buttons" component={ButtonPage} />
                <Route exact path="/cards" component={CardPage} />
                <Route exact path="/widgets" component={WidgetPage} />
                <Route exact path="/typography" component={TypographyPage} />
                <Route exact path="/alerts" component={AlertPage} />
                <Route exact path="/badges" component={BadgePage} />
                <Route exact path="/button-groups" component={ButtonGroupPage} />
                <Route exact path="/dropdowns" component={DropdownPage} />
                <Route exact path="/progress" component={ProgressPage} />
                <Route exact path="/modals" component={ModalPage} />
                <Route exact path="/forms" component={FormPage} />
                <Route exact path="/input-groups" component={InputGroupPage} />
                <Route exact path="/charts" component={ChartPage} /> */}
                
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
