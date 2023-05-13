import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { updateLoginConnection } from 'api/axios';
import { localConfigService } from 'api/localConfigService';
import store from 'store';

import { App } from './App';
import reportWebVitals from './reportWebVitals';

// Call the element loader after the platform has been bootstrapped
void defineCustomElements(window);

const AppSetup = () => (
    <IonApp>
        <IonReactRouter>
            <App />
        </IonReactRouter>
    </IonApp>
);

const LazyApp = React.lazy(async () => {
    await localConfigService
        .getHeader()
        .then((header) => {
            if (header) {
                localConfigService.initHeader(header);
                updateLoginConnection(header, true);
            }
        })
        .catch(console.error);

    return { default: AppSetup };
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Suspense fallback={null}>
                <LazyApp />
            </Suspense>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
