import React, { useCallback, useMemo, useState } from 'react';
import { IonIcon, IonList } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { chevronBack } from 'ionicons/icons';
import { FlipCardLayout } from 'layouts/FlipCardLayout';

import { Button } from 'components/Button';
import { LoginForm } from 'components/LoginForm';
import { SignUpForm } from 'components/SignUpForm';

import { AuthorisationMethod } from './AuthorisationCard.types';

import styles from './AuthorisationCard.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const AuthorisationCard = () => {
    const [method, setMethod] = useState<AuthorisationMethod>();

    const renderStep = useMemo(() => {
        switch (method) {
            case AuthorisationMethod.LOGIN:
                return <LoginForm />;
            case AuthorisationMethod.REGISTER:
                return <SignUpForm />;
            default:
                return null;
        }
    }, [method]);

    const resetMethod = useCallback(() => {
        setMethod(undefined);
    }, []);

    return (
        <FlipCardLayout
            isRotated={!!method}
            direction={method === AuthorisationMethod.REGISTER ? 'left' : 'right'}
            contentDimensions={{ width: 440, height: 580 }}
        >
            <div className={cx('authorisation-card')}>
                <IonList className={cx('auth-select')}>
                    <Button onClick={() => setMethod(AuthorisationMethod.LOGIN)}>Войти</Button>
                    <Button onClick={() => setMethod(AuthorisationMethod.REGISTER)}>Зарегистрироваться</Button>
                </IonList>
            </div>
            <div className={cx('authorisation-card')}>
                <Button onClick={resetMethod} className={cx('button-back')} fill="clear">
                    <IonIcon icon={chevronBack}></IonIcon>
                    Назад
                </Button>
                {renderStep}
            </div>
        </FlipCardLayout>
    );
};