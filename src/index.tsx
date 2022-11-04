import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import store from 'store';

import { App } from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <IonApp>
                <IonReactRouter>
                    <App />
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
