import React, { useCallback, useEffect } from 'react';
import { Form } from 'react-final-form';
import { IonList, useIonAlert, useIonRouter } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'store';
import { clearUserError, loginAction } from 'store/user';

import { Button } from 'components/Button';
import { CustomInputField } from 'components/Fields/CustomInputField';
import { LoginValues } from 'components/LoginForm/LoginForm.types';
import { TextType, Typography } from 'components/Typography';

import { validateLogin } from './LoginForm.utils';

import styles from './LoginForm.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const LoginForm = () => {
    const router = useIonRouter();
    const [presentAlert] = useIonAlert();
    const { errorMessage } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const handleSubmit = useCallback(
        (values: LoginValues) => {
            void dispatch(loginAction(values)).then(() => router.push('/'));
        },
        [dispatch, router],
    );

    useEffect(() => {
        if (errorMessage) {
            void presentAlert({
                header: 'Ошибка',
                message: errorMessage,
                buttons: ['Закрыть'],
            }).then(() => {
                dispatch(clearUserError());
            });
        }
    }, [dispatch, errorMessage, presentAlert]);

    return (
        <div className={cx('login-form__wrapper')}>
            <Typography type={TextType.TITLE_36_48}>Вход</Typography>
            <Form<LoginValues> validate={validateLogin} onSubmit={handleSubmit}>
                {({ handleSubmit, valid }) => (
                    <IonList className={cx('login-form')} mode="md">
                        <CustomInputField label="Никнейм" inputType="input" name="username" />
                        <CustomInputField type="password" label="Пароль" inputType="input" name="password" />
                        <Button disabled={!valid} onClick={handleSubmit} size="large">
                            <Typography type={TextType.CAPTION_18_24}>Войти</Typography>
                        </Button>
                    </IonList>
                )}
            </Form>
        </div>
    );
};
