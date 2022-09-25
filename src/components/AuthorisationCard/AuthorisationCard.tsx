import React, { useCallback, useMemo, useState } from 'react';
import { IonIcon, IonList } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { chevronBack } from 'ionicons/icons';
import { FlipCardLayout } from 'layouts/FlipCardLayout';
import { useAppSelector } from 'store';
import { getIsMobile } from 'store/windowSize';

import { Button } from 'components/Button';
import { LoginForm } from 'components/LoginForm';
import { SignUpForm } from 'components/SignUpForm';

import { AuthorisationMethod } from './AuthorisationCard.types';

import styles from './AuthorisationCard.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const AuthorisationCard = () => {
    const [method, setMethod] = useState<AuthorisationMethod>();

    const { width } = useAppSelector((state) => state.windowSize);
    const isMobile = useAppSelector(getIsMobile);

    const renderStep = useMemo(() => {
        switch (method) {
            case AuthorisationMethod.LOGIN:
                return <LoginForm />;
            case AuthorisationMethod.REGISTER:
                return <SignUpForm onComplete={() => setMethod(AuthorisationMethod.LOGIN)} />;
            default:
                return null;
        }
    }, [method]);

    const resetMethod = useCallback(() => {
        setMethod(undefined);
    }, []);

    const dimensions = useMemo(
        () => (isMobile ? { width: (width < 472 ? width : 440) - 32, height: 580 } : { width: 440, height: 580 }),
        [isMobile, width],
    );

    return (
        <FlipCardLayout
            isRotated={!!method}
            direction={method === AuthorisationMethod.REGISTER ? 'left' : 'right'}
            contentDimensions={dimensions}
        >
            <div className={cx('authorisation-card')}>
                <IonList className={cx('auth-select')}>
                    <Button size="large" onClick={() => setMethod(AuthorisationMethod.LOGIN)}>
                        Войти
                    </Button>
                    <Button size="large" color="secondary" onClick={() => setMethod(AuthorisationMethod.REGISTER)}>
                        Зарегистрироваться
                    </Button>
                </IonList>
            </div>
            <div className={cx('authorisation-card')}>
                <Button onClick={resetMethod} className={cx('button-back')} fill="clear">
                    <IonIcon icon={chevronBack} />
                    Назад
                </Button>
                {renderStep}
            </div>
        </FlipCardLayout>
    );
};
