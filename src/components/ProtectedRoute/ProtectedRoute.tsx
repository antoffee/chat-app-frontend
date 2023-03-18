import React from 'react';
import { Redirect, Route } from 'react-router';
import { appRoutes } from 'routes';

import { ProtectedRouteProps } from './ProtectedRoute.types';

export const ProtectedRoute = ({ children, isAuth, ...props }: ProtectedRouteProps) => {
    return <Route {...props}>{isAuth ? children : <Redirect to={appRoutes.login()} />}</Route>;
};
