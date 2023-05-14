import React, { PropsWithChildren } from 'react';
import { IonIcon, IonTabBar, IonTabButton, IonTabs, useIonRouter } from '@ionic/react';
import cnBind from 'classnames/bind';
import { useAppSelector } from 'store';
import { getIsLoggedIn } from 'store/auth';

import { TABS } from './BottomNavigationTabs.constants';

import styles from './BottomNavigationTabs.module.scss';

const cx = cnBind.bind(styles);

export const BottomNavigationTabs = ({ children }: PropsWithChildren<Record<never, never>>) => {
    const isLogged = useAppSelector(getIsLoggedIn);

    const router = useIonRouter();

    const isHidden = router.routeInfo.pathname.includes('chat') && router.routeInfo.pathname !== '/chats';

    return (
        <IonTabs>
            {children}
            <IonTabBar className={cx('tab-bar', { unauthorized: !isLogged || isHidden })} slot="bottom">
                {TABS.map(({ icon, ...tab }) => (
                    <IonTabButton className={cx('tab-button')} key={tab.tab} {...tab}>
                        <IonIcon className={cx('icon')} icon={icon} />
                    </IonTabButton>
                ))}
            </IonTabBar>
        </IonTabs>
    );
};
