import { OmitNative, RouteProps } from 'react-router';

export type ProtectedRouteProps<Path extends string = string, T = Record<string, unknown>> = RouteProps<Path> &
    OmitNative<T, keyof RouteProps> & { isAuth: boolean };
