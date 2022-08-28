import React from 'react';
import heart from 'assets/heart_3d.png';
import cnBind, { Argument } from 'classnames/bind';

import { TextType, Typography } from 'components/Typography';

import styles from './WelcomeMessage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const WelcomeMessage = () => {
    return (
        <div className={cx('message-container')}>
            <img src={heart} />
            <Typography type={TextType.TITLE_36_48}>Добро пожаловать</Typography>
        </div>
    );
};
