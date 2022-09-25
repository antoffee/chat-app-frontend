import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { IonList, useIonAlert } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { ApiUserEntityResponseRolesEnum } from 'generated';

import { Button } from 'components/Button';
import { CustomInputField } from 'components/Fields/CustomInputField';
import { TextType, Typography } from 'components/Typography';
import { handleResponseAndThrowAnErrorIfExists, noop } from 'utils';

import { usersApi, validateEmail, validateRequired, validateUsernameAvailability } from './SignUp.utils';
import { SignUpFormProps, SignUpValues } from './SignUpForm.types';

import styles from './SignUpForm.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SignUpForm = ({ onComplete = noop }: SignUpFormProps) => {
    const [presentAlert] = useIonAlert();

    const handleSubmit = useCallback(
        async (values: SignUpValues) => {
            try {
                const resp = await usersApi.usersControllerCreateUser({
                    ...values,
                    roles: [ApiUserEntityResponseRolesEnum.REGULAR],
                });

                handleResponseAndThrowAnErrorIfExists(resp);

                void presentAlert({
                    header: 'Вы зарегистрировались!',
                    message: 'Пожалуйста, авторизуйтесь, используя созданный никтнейм и пароль',
                    buttons: ['ОК'],
                }).then(onComplete);
            } catch (error) {
                void presentAlert({
                    header: 'Ошибка',
                    message: (error as Error)?.message ?? 'Ошибка',
                    buttons: ['Закрыть'],
                });
            }
        },
        [onComplete, presentAlert],
    );

    return (
        <div className={cx('sign-up-form__wrapper')}>
            <Typography type={TextType.TITLE_36_48}>Регистрация</Typography>
            <Form<SignUpValues> onSubmit={handleSubmit}>
                {({ handleSubmit, valid, errors, active }) => (
                    <IonList className={cx('sign-up-form')} mode="md">
                        <CustomInputField
                            label="Никнейм*"
                            inputType="input"
                            name="username"
                            debounce={400}
                            validate={active === 'username' ? validateUsernameAvailability : undefined}
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
                        <pre>{JSON.stringify(errors, undefined, 2)}</pre>
                    </IonList>
                )}
            </Form>
        </div>
    );
};
