import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { useColorMode } from 'hooks/useColorMode';
import { useWindowSize } from 'hooks/useWindowSize';
import { ChatsPage } from 'pages/ChatsPage';
import { DemoPage } from 'pages/DemoPage';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { appRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { getChatList } from 'store/chats/chats.actions';
import { authAction } from 'store/user';

import { BottomNavigationTabs } from 'components/BottomNavigationTabs';
import { ProtectedRoute } from 'components/ProtectedRoute';

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
    const isAuth = useAppSelector((state) => !!state.user.user?.id);

    useEffect(() => {
        if (isAuth) {
            void dispatch(getChatList());
        } else {
            void dispatch(authAction());
        }
    }, [dispatch, isAuth]);

    return (
        <IonPage>
            <Route
                path="/"
                render={() => (
                    <BottomNavigationTabs>
                        <IonRouterOutlet>
                            <Route exact path={appRoutes.login()}>
                                {isAuth ? <Redirect to="/" /> : <LoginPage />}
                            </Route>
                            <ProtectedRoute path="/" exact>
                                <HomePage />
                            </ProtectedRoute>
                            <Route path="/demo">
                                <DemoPage />
                            </Route>
                            <ProtectedRoute path={appRoutes.chats()}>
                                <ChatsPage />
                            </ProtectedRoute>
                        </IonRouterOutlet>
                    </BottomNavigationTabs>
                )}
            />
        </IonPage>
    );
};
