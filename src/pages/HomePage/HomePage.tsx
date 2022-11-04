import React from 'react';
import { IonImg } from '@ionic/react';
import heart from 'assets/heart_3d.png';
import cnBind, { Argument } from 'classnames/bind';
import { PageLayout } from 'layouts/PageLayout';
import { useAppSelector } from 'store';

import { TextType, Typography } from 'components/Typography';

import styles from './HomePage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const HomePage = () => {
    const { user } = useAppSelector((state) => state.user);

    return (
        <PageLayout>
            <div className={cx('home')}>
                <Typography as="div" type={TextType.TITLE_36_48}>
                    Добро пожаловать,{' '}
                    <Typography className={cx('home__user-name')} as="span" type={TextType.TITLE_36_48}>
                        {user?.username}
                    </Typography>
                </Typography>
                <IonImg src={heart} />
            </div>
        </PageLayout>
    );
};