import React, { useCallback, useEffect } from 'react';
import { Form } from 'react-final-form';
import { IonList, useIonAlert } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'store';
import { clearUserError } from 'store/auth';
import { signUpAction } from 'store/auth/auth.actions';

import { Button } from 'components/Button';
import { CustomInputField } from 'components/Fields/CustomInputField';
import { TextType, Typography } from 'components/Typography';
import { noop } from 'utils';

import { validateEmail, validateRequired, validateUsernameAvailability } from './SignUp.utils';
import { SignUpFormProps, SignUpValues } from './SignUpForm.types';

import styles from './SignUpForm.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SignUpForm = ({ onComplete = noop }: SignUpFormProps) => {
    const [presentAlert] = useIonAlert();

    const dispatch = useAppDispatch();

    const { errorMessage } = useAppSelector((state) => state.auth);

    const handleSubmit = useCallback(
        (values: SignUpValues) => {
            void dispatch(signUpAction(values)).then(({ meta }) => {
                if (meta.requestStatus === 'fulfilled') {
                    void presentAlert({
                        header: 'Вы зарегистрировались!',
                        buttons: ['ОК'],
                    }).then(onComplete);
                }
            });
        },
        [dispatch, onComplete, presentAlert],
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
        <div className={cx('sign-up-form__wrapper')}>
            <Typography type={TextType.TITLE_36_48}>Регистрация</Typography>
            <Form<SignUpValues> onSubmit={handleSubmit}>
                {({ handleSubmit, valid }) => (
                    <IonList className={cx('sign-up-form')} mode="md">
                        <CustomInputField
                            label="Никнейм*"
                            inputType="input"
                            name="username"
                            debounce={400}
                            validate={validateUsernameAvailability}
                        />
                        <CustomInputField
                            validate={validateRequired}
                            type="password"
                            label="Пароль*"
                            inputType="input"
                            name="password"
                        />
                        <CustomInputField
                            validate={validateRequired}
                            label="Имя Фамилия*"
                            inputType="input"
                            name="name"
                        />
                        <CustomInputField
                            validate={validateEmail}
                            inputMode="email"
                            label="Электронная почта"
                            inputType="input"
                            name="email"
                        />
                        <Button disabled={!valid} onClick={handleSubmit} size="large">
                            <Typography type={TextType.CAPTION_18_24}>Зарегистрироваться</Typography>
                        </Button>
                    </IonList>
                )}
            </Form>
        </div>
    );
};
