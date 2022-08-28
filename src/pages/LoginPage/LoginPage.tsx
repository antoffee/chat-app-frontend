import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';

import { AuthorisationCard } from 'components/AuthorisationCard';
import { WelcomeMessage } from 'components/WelcomeMessage';

import styles from './LoginPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const LoginPage = () => {
    return (
        <IonPage className={cx('login-page')}>
            <IonContent>
                <div className={cx('login-page__content')}>
                    <AuthorisationCard />
                    <WelcomeMessage />
                </div>
            </IonContent>
        </IonPage>
    );
};
