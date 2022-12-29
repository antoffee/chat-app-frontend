import React, { PropsWithChildren } from 'react';
import { IonIcon, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import cnBind from 'classnames/bind';
import { useAppSelector } from 'store';
import { getIsLoggedIn } from 'store/auth';

import { TABS } from './BottomNavigationTabs.constants';

import styles from './BottomNavigationTabs.module.scss';

const cx = cnBind.bind(styles);

export const BottomNavigationTabs = ({ children }: PropsWithChildren<Record<never, never>>) => {
    const isLogged = useAppSelector(getIsLoggedIn);

    return (
        <IonTabs>
            {children}
            <IonTabBar className={cx('tab-bar', { unauthorized: !isLogged })} slot="bottom">
                {TABS.map(({ icon, ...tab }) => (
                    <IonTabButton className={cx('tab-button')} key={tab.tab} {...tab}>
                        <IonIcon className={cx('icon')} icon={icon} />
                    </IonTabButton>
                ))}
            </IonTabBar>
        </IonTabs>
    );
};
