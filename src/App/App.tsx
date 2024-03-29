import React, { useCallback, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { IonLoading, IonPage, IonRouterOutlet, setupIonicReact, useIonAlert, useIonRouter } from '@ionic/react';
import { localConfigService } from 'api/localConfigService';
import { socketService } from 'api/socketService';
import { useColorMode } from 'hooks/useColorMode';
import { useWindowSize } from 'hooks/useWindowSize';
import { PageLayout } from 'layouts/PageLayout';
import { AvatarEditPage } from 'pages/AvatarEditPage';
import { ChatDetailsPage } from 'pages/ChatDetailsPage';
import { ChatsPage } from 'pages/ChatsPage';
import { DemoPage } from 'pages/DemoPage';
import { EditSettingsPage } from 'pages/EditSettingsPage';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { ProfilePage } from 'pages/ProfilePage';
import { appRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { authAction, confirmEmailAction, getIsLoggedIn, updatePasswordAction } from 'store/auth';
import { useLazyConnectQuery } from 'store/sockets';
import { FetchStatus } from 'types/asyncState';

import { BottomNavigationTabs } from 'components/BottomNavigationTabs';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { SidebarSettings } from 'components/SidebarSettings/SidebarSettings';
import { SidebarSettingsEdit } from 'components/SidebarSettingsEdit';

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

    const router = useIonRouter();
    const {
        routeInfo: { search, pathname },
    } = router;

    const [presentAlert] = useIonAlert();

    const handleResetPass = useCallback(
        (token: string) => {
            presentAlert({
                message: 'Введите новый пароль',
                inputs: [
                    {
                        placeholder: 'Пароль',
                        type: 'password',
                    },
                ],
                buttons: [
                    {
                        text: 'Подтвердить',
                        handler: (value: Record<number, string>) => {
                            void dispatch(updatePasswordAction({ newPassword: value[0], token: token }));
                        },
                    },
                    { text: 'Отмена' },
                ],
            }).catch(console.error);
        },
        [dispatch, presentAlert],
    );

    useEffect(() => {
        if (isAuth) {
            if (!socketService.socket && localConfigService.authHeader) {
                socketService.connect(localConfigService.authHeader);
            }
            void connect();
        } else if (localConfigService.authHeader) {
            void dispatch(authAction());
        }
    }, [connect, dispatch, isAuth]);

    useEffect(() => {
        const emailToken = new URLSearchParams(search).get('confirmEmailToken');
        if (emailToken) {
            void dispatch(confirmEmailAction(emailToken)).then(() => {
                router.push(pathname);
            });
        }
    }, [dispatch, pathname, router, search]);
    useEffect(() => {
        const passToken = new URLSearchParams(search).get('forgotPasswordToken');
        if (passToken) {
            handleResetPass(passToken);
        }
    }, [dispatch, handleResetPass, pathname, router, search]);

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
                                    <ProtectedRoute isAuth={isAuth} exact path={appRoutes.settingsEditMobile()}>
                                        <SidebarSettingsEdit />
                                    </ProtectedRoute>
                                    <ProtectedRoute isAuth={isAuth} exact path={appRoutes.chats()}>
                                        <ChatsPage />
                                    </ProtectedRoute>
                                    <ProtectedRoute isAuth={isAuth} path={appRoutes.chatDetails()}>
                                        <ChatDetailsPage />
                                    </ProtectedRoute>
                                    <ProtectedRoute isAuth={isAuth} path={appRoutes.avatarEditMobile()}>
                                        <AvatarEditPage />
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
