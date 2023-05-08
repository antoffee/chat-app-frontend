import React from 'react';
import { IonButton, IonSpinner } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';

import { ButtonProps } from './Button.types';

import styles from './Button.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const Button = ({ className, loading, children, ...props }: ButtonProps) => {
    return (
        <IonButton {...props} className={cx('custom-button', className)}>
            {loading ? <IonSpinner /> : children}
        </IonButton>
    );
};
