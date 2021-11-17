import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const LayoutRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const token = localStorage.getItem('token');
  
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          {!token ? <Component {...props} /> : <Redirect to="/" />}
        </Layout>
      )}
    />
  );
};

export default LayoutRoute;
