import React from 'react';
import { Form } from 'react-final-form';
import { IonList } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';

import { CustomInputField } from 'components/Fields/CustomInputField';

import { EditSettingsFormProps } from './EditSettingsForm.types';

import styles from './EditSettingsForm.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const EditSettingsForm: React.FC<EditSettingsFormProps> = () => {
    return (
        <Form onSubmit={() => undefined}>
            {() => {
                <IonList className={cx('')}>
                    <CustomInputField inputType="input" name="name" />
                    <CustomInputField inputType="input" name="username" />
                    <CustomInputField inputType="input" name="email" />
                    <CustomInputField inputType="input" name="password" />
                </IonList>;
            }}
        </Form>
    );
};
