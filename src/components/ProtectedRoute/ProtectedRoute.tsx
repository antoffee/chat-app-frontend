import React from 'react';
import { Redirect, Route } from 'react-router';
import { appRoutes } from 'routes';
import { useAppSelector } from 'store';
import { getIsLoggedIn } from 'store/auth';

import { ProtectedRouteProps } from './ProtectedRoute.types';

export const ProtectedRoute = ({ children, ...props }: ProtectedRouteProps) => {
    const isAuth = useAppSelector(getIsLoggedIn);

    return <Route {...props}>{isAuth ? children : <Redirect to={appRoutes.login()} />}</Route>;
};
