import React from 'react';
import { Redirect, Route } from 'react-router';
import { IonPage, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { useColorMode } from 'hooks/useColorMode';
import { useWindowSize } from 'hooks/useWindowSize';
import { DemoPage } from 'pages/DemoPage';
import { LoginPage } from 'pages/LoginPage';
import { appRoutes } from 'routes';

import { BottomNavigationTabs } from 'components/BottomNavigationTabs';

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

    return (
        <IonPage>
            <Route
                path="/"
                render={() => (
                    <BottomNavigationTabs>
                        <IonRouterOutlet>
                            <Route render={() => <Redirect to={appRoutes.login()} />} />
                            <Route exact path={appRoutes.login()}>
                                <LoginPage />
                            </Route>
                            <Route path="/demo">
                                <DemoPage />
                            </Route>
                        </IonRouterOutlet>
                    </BottomNavigationTabs>
                )}
            />
        </IonPage>
    );
};
