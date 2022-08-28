import { GENDER_OPTIONS } from 'constants/select';

import React from 'react';
import { Form } from 'react-final-form';
import { IonList } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';

import { Button } from 'components/Button';
import { CustomInputField } from 'components/Fields/CustomInputField';
import { ToggleButtonsField } from 'components/Fields/ToggleButtonsField';
import { TextType, Typography } from 'components/Typography';

import { validateSignUp } from './SignUp.utils';
import { SignUpFormProps, SignUpValues } from './SignUpForm.types';

import styles from './SignUpForm.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SignUpForm: React.FC<SignUpFormProps> = () => {
    return (
        <div className={cx('sign-up-form__wrapper')}>
            <Typography type={TextType.TITLE_36_48}>Регистрация</Typography>
            <Form<SignUpValues> validate={validateSignUp} onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
                {({ handleSubmit, valid }) => (
                    <IonList className={cx('sign-up-form')} mode="md">
                        <CustomInputField label="Никнейм*" inputType="input" name="username" />
                        <CustomInputField type="password" label="Пароль*" inputType="input" name="password" />
                        <CustomInputField label="Имя Фамилия" inputType="input" name="name" />
                        <CustomInputField inputMode="email" label="Электронная почта" inputType="input" name="email" />
                        <ToggleButtonsField name="gender" items={GENDER_OPTIONS} />
                        <Button disabled={!valid} onClick={handleSubmit} size="large">
                            <Typography type={TextType.CAPTION_18_24}>Зарегистрироваться</Typography>
                        </Button>
                    </IonList>
                )}
            </Form>
        </div>
    );
};
