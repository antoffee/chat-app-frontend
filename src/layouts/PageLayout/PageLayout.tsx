import React from 'react';
import { IonContent, IonPage, IonSplitPane } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { useNodeUid } from 'hooks/useNodeUid';
import { PageLayoutProps } from 'layouts/PageLayout/PageLayout.types';

import { SidebarChats } from 'components/SidebarChats';

import styles from './PageLayout.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const PageLayout = ({ children }: PageLayoutProps) => {
    const id = useNodeUid();

    return (
        <>
            <IonContent className={cx('page-layout')}>
                <IonSplitPane when="md" contentId={id}>
                    {/*--  the side menu  --*/}
                    <SidebarChats id={id} />

                    {/*-- the main content --*/}
                    <IonPage id={id}>{children}</IonPage>
                </IonSplitPane>
                {/* <CreateChatModal/> */}
            </IonContent>
        </>
    );
};
