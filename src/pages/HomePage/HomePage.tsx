import React from 'react';
import cnBind, { Argument } from 'classnames/bind';
import { PageLayout } from 'layouts/PageLayout';

import styles from './HomePage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const HomePage = () => {
    return (
        <PageLayout>
            <div className={cx('home')} />
            Home
        </PageLayout>
    );
};
