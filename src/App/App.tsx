import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { IonLoading, IonPage, IonRouterOutlet, setupIonicReact, useIonRouter } from '@ionic/react';
import { localConfigService } from 'api/localConfigService';
import { useColorMode } from 'hooks/useColorMode';
import { useWindowSize } from 'hooks/useWindowSize';
import { PageLayout } from 'layouts/PageLayout';
import { ChatDetailsPage } from 'pages/ChatDetailsPage';
import { ChatsPage } from 'pages/ChatsPage';
import { DemoPage } from 'pages/DemoPage';
import { EditSettingsPage } from 'pages/EditSettingsPage';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { ProfilePage } from 'pages/ProfilePage';
import { appRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { authAction, confirmEmailAction, getIsLoggedIn } from 'store/auth';
import { useLazyConnectQuery } from 'store/sockets';
import { FetchStatus } from 'types/asyncState';

import { BottomNavigationTabs } from 'components/BottomNavigationTabs';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { SidebarSettings } from 'components/SidebarSettings/SidebarSettings';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import 'theme/variables.scss';
/* Global styles */
import 'theme/global.scss';

setupIonicReact({
    spinner: 'bubbles',
});

export const App: React.FC = () => {
    useColorMode();
    useWindowSize();

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(getIsLoggedIn);
    const { loadingStatus } = useAppSelector((state) => state.auth);

    const [connect] = useLazyConnectQuery();

    const {
        routeInfo: { search },
    } = useIonRouter();

    useEffect(() => {
        if (isAuth) {
            void connect();
        } else if (localConfigService.authHeader) {
            void dispatch(authAction());
        }
    }, [connect, dispatch, isAuth]);

    useEffect(() => {
        const token = new URLSearchParams(search).get('confirmEmailToken');
        if (token) {
            void dispatch(confirmEmailAction(token));
        }
    }, [dispatch, search]);

    const authIsPending =
        !isAuth &&
        !!localConfigService.authHeader &&
        ![FetchStatus.REJECTED, FetchStatus.FULFILLED].includes(loadingStatus);

    return (
        <IonPage>
            {authIsPending ? (
                <IonLoading isOpen />
            ) : (
                <Route
                    path="/"
                    render={() => (
                        <BottomNavigationTabs>
                            <IonRouterOutlet>
                                <Route exact path={appRoutes.login()}>
                                    {isAuth ? <Redirect to="/" /> : <LoginPage />}
                                </Route>
                                <PageLayout>
                                    <ProtectedRoute isAuth={isAuth} path="/" exact>
                                        <HomePage />
                                    </ProtectedRoute>
                                    <Route path="/demo">
                                        <DemoPage />
                                    </Route>
                                    <ProtectedRoute isAuth={true} exact path={appRoutes.settings()}>
                                        <ProfilePage />
                                    </ProtectedRoute>
                                    <ProtectedRoute isAuth={isAuth} exact path={appRoutes.settingsEdit()}>
                                        <EditSettingsPage />
                                    </ProtectedRoute>
                                    <ProtectedRoute isAuth={isAuth} exact path={appRoutes.settingsMobile()}>
                                        <SidebarSettings />
                                    </ProtectedRoute>
                                    <ProtectedRoute isAuth={isAuth} exact path={appRoutes.chats()}>
                                        <ChatsPage />
                                    </ProtectedRoute>
                                    <ProtectedRoute isAuth={isAuth} path={appRoutes.chatDetails()}>
                                        <ChatDetailsPage />
                                    </ProtectedRoute>
                                    {/* <Route  path={'*'}>404</Route> */}
                                </PageLayout>
                            </IonRouterOutlet>
                        </BottomNavigationTabs>
                    )}
                />
            )}
        </IonPage>
    );
};
