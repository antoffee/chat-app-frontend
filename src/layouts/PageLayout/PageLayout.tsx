import React, { useMemo } from 'react';
import { IonContent, IonMenu, IonPage, IonSplitPane, useIonRouter } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { useNodeUid } from 'hooks/useNodeUid';
import { PageLayoutProps } from 'layouts/PageLayout/PageLayout.types';
import { appRoutes } from 'routes';

import { SidebarChats } from 'components/SidebarChats';
import { SidebarSettings } from 'components/SidebarSettings/SidebarSettings';
import { SidebarSettingsEdit } from 'components/SidebarSettingsEdit';

import styles from './PageLayout.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const PageLayout = ({ children }: PageLayoutProps) => {
    const id = useNodeUid();

    const { routeInfo } = useIonRouter();

    const isSettingsPart = useMemo(() => routeInfo.pathname === appRoutes.settings(), [routeInfo.pathname]);
    const isSettingsEditPart = useMemo(() => routeInfo.pathname === appRoutes.settingsEdit(), [routeInfo.pathname]);

    return (
        <>
            <IonContent className={cx('page-layout')}>
                <IonSplitPane when="md" contentId={id}>
                    {/*--  the side menu  --*/}
                    <IonMenu contentId={id} className={cx('sidebar')}>
                        {isSettingsPart ? (
                            <SidebarSettings />
                        ) : isSettingsEditPart ? (
                            <SidebarSettingsEdit />
                        ) : (
                            <SidebarChats />
                        )}
                    </IonMenu>
                    {/*-- the main content --*/}

                    <IonPage id={id}>{children}</IonPage>
                </IonSplitPane>
                {/* <CreateChatModal/> */}
            </IonContent>
        </>
    );
};
