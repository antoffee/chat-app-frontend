import React from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { StoryFn } from '@storybook/react';

import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import store from '../src/store';
import i18n from '../src/i18n';
import { useAuthorization } from '../src/hooks/useAuthorization';
import { useAuthRefresh } from '../src/hooks/useAuthRefresh';
import { useWindowSize } from '../src/hooks/useWindowSize';
import { useDarkTheme } from '../src/hooks/useDarkTheme';
import { useLoadClassificators } from '../src/hooks/loaders/useLoadClassificators';
import { useLoadLocalConfig } from '../src/hooks/loaders/useLoadLocalConfig';
import { useLoadMyWallets } from '../src/hooks/loaders/useLoadMyWallets';
import { useLoadPaymentCards } from '../src/hooks/loaders/useLoadPaymentCards';
import { useLoadChannelCategoriesList } from '../src/hooks/loaders/useLoadChannelCategoriesList';
import { useLoadAgreements } from '../src/hooks/loaders/useLoadAgreements';
import { useLoadLocation } from '../src/hooks/loaders/useLoadLocation';
import { useLoadTransactions } from '../src/hooks/loaders/useLoadTransactions';
import { noop } from '../src/utils/noop';

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
import '../src/theme/variables.scss';
/* Global styles */
import '../src/theme/global.scss';

setupIonicReact();

const Wrapper = ({ children }: { children: JSX.Element }) => {
    useWindowSize();
    useDarkTheme();
    useAuthorization(noop);
    useAuthRefresh();
    useLoadAgreements();
    useLoadLocalConfig();
    useLoadClassificators();
    useLoadMyWallets();
    useLoadPaymentCards();
    useLoadTransactions();
    useLoadChannelCategoriesList();
    useLoadLocation();

    return children;
};

export const decorators = [
    (Story: StoryFn) => (
        <Provider store={store}>
            <IonReactRouter>
                <IonApp>
                    <Wrapper>
                        <Story />
                    </Wrapper>
                </IonApp>
            </IonReactRouter>
        </Provider>
    ),
];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    darkMode: {
        stylePreview: true,
    },
    i18n,
    locale: 'en',
    locales: {
        en: 'English',
        lv: 'Latviski',
        ru: 'Русский',
    },
};

export const argTypes = {
    mode: {
        control: 'radio',
        options: ['md', 'ios'],
    },
};
