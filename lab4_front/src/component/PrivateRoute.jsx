import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const isAuthenticated = !!accessToken && !!refreshToken;

    return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>;
};

export default PrivateRoute;