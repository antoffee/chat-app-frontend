import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { updateLoginConnection } from 'api/axios';
import { localConfigService } from 'api/localConfigService';
import store from 'store';

import { App } from './App';
import reportWebVitals from './reportWebVitals';

const LazyApp = React.lazy(async () => {
    await localConfigService
        .getHeader()
        .then((header) => {
            if (header) {
                localConfigService.initHeader(header);
                updateLoginConnection(header);
            }
        })
        .catch(console.error);

    return { default: App };
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <IonApp>
                <IonReactRouter>
                    <Suspense fallback={null}>
                        <LazyApp />
                    </Suspense>
                </IonReactRouter>
            </IonApp>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
