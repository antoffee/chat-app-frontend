import React, { useCallback } from 'react';
import { IonToggleCustomEvent, ToggleChangeEventDetail } from '@ionic/core';
import { IonToggle } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'store';
import { saveTheme } from 'store/localConfig';

import styles from './ThemeToggle.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ThemeToggle = () => {
    const theme = useAppSelector((state) => state.localConfig.theme);
    const dispatch = useAppDispatch();

    const handleToggleChange = useCallback(
        (e: IonToggleCustomEvent<ToggleChangeEventDetail<unknown>>) => {
            void dispatch(saveTheme(e.detail.checked ? 'dark' : 'light'));
        },
        [dispatch],
    );

    return <IonToggle className={cx('theme-toggle')} checked={theme === 'dark'} onIonChange={handleToggleChange} />;
};
