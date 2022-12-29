import React from 'react';
import { IonToggle } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';

import { CustomToggleProps } from './CustomToggle.types';

import styles from './CustomToggle.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const CustomToggle = ({ className, ...props }: CustomToggleProps) => {
    return <IonToggle ion-toggle-text="online;offline" className={cx('custom-toggle', className)} {...props} />;
};
