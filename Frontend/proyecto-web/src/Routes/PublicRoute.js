import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, ...rest}) => {
    const token = localStorage.getItem("token");

    return (
        <Route {...rest} >{!token ? <Component /> : <Redirect to="/" />}</Route>
    );
};

export default PublicRoute;