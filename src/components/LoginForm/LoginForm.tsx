import React from 'react';
import { Form } from 'react-final-form';
import { IonList } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';

import { Button } from 'components/Button';
import { CustomInputField } from 'components/Fields/CustomInputField';
import { SignUpValues } from 'components/SignUpForm/SignUpForm.types';
import { TextType, Typography } from 'components/Typography';

import { validateLogin } from './LoginForm.utils';

import styles from './LoginForm.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const LoginForm = () => {
    return (
        <div className={cx('login-form__wrapper')}>
            <Typography type={TextType.TITLE_36_48}>Вход</Typography>
            <Form<SignUpValues> validate={validateLogin} onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
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
