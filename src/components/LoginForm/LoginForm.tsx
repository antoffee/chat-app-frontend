import React, { useCallback, useEffect } from 'react';
import { Form } from 'react-final-form';
import { IonButton, IonList, useIonAlert, useIonRouter } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { EmailApi } from 'generated';
import { useAppDispatch, useAppSelector } from 'store';
import { clearUserError, loginAction } from 'store/auth';

import { Button } from 'components/Button';
import { CustomInputField } from 'components/Fields/CustomInputField';
import { LoginValues } from 'components/LoginForm/LoginForm.types';
import { TextType, Typography } from 'components/Typography';

import { validateLogin } from './LoginForm.utils';

import styles from './LoginForm.module.scss';

const authApi = new EmailApi();

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const LoginForm = () => {
    const router = useIonRouter();
    const [presentAlert, closeAlert] = useIonAlert();
    const { errorMessage } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const handleSubmit = useCallback(
        (values: LoginValues) => {
            void dispatch(loginAction(values)).then(({ meta }) => {
                if (meta.requestStatus !== 'rejected') {
                    router.push('/');
                }
            });
        },
        [dispatch, router],
    );

    const handleResetPass = useCallback(() => {
        presentAlert({
            message: 'Введите адрес электронной почты, привязанный к вашему аккаунту',
            inputs: [
                {
                    placeholder: 'E-mail',
                },
            ],
            buttons: [
                {
                    text: 'Подтвердить',
                    handler: (value: string) => {
                        authApi
                            .emailControllerForgotPassword({ email: value[0] })
                            .catch(console.error)
                            .finally(() => {
                                void closeAlert();
                            });
                    },
                },
                { text: 'Отмена' },
            ],
        }).catch(console.error);
    }, [closeAlert, presentAlert]);

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
                        <IonButton color={'primary'} fill="clear" id="present-alert" onClick={handleResetPass}>
                            Забыли пароль?
                        </IonButton>

                        <Button disabled={!valid} onClick={handleSubmit} size="large">
                            <Typography type={TextType.CAPTION_18_24}>Войти</Typography>
                        </Button>
                    </IonList>
                )}
            </Form>
        </div>
    );
};
