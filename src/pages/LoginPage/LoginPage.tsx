import React, { useEffect } from 'react';
import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { appRoutes } from 'routes';
import { useAppSelector } from 'store';

import { AuthorisationCard } from 'components/AuthorisationCard';
import { WelcomeMessage } from 'components/WelcomeMessage';

import styles from './LoginPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const LoginPage = () => {
    const isAuth = useAppSelector((state) => !!state.auth.user?.id);
    const router = useIonRouter();

    useEffect(() => {
        if (isAuth) {
            router.push(appRoutes.home());
        }
    }, [isAuth, router]);

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
