import React from 'react';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { useNodeUid } from 'hooks/useNodeUid';
import { arrowBack } from 'ionicons/icons';
import { appRoutes } from 'routes';
import { useAppSelector } from 'store';

import { Button } from 'components/Button';

import styles from './SidebarChats.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SidebarSettings = () => {
    const { user } = useAppSelector((state) => state.auth);
    const uniqueId = useNodeUid();

    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                    <IonButtons slot="start">
                        <Button href={appRoutes.chats()} id={uniqueId}>
                            <IonIcon slot="icon-only" icon={arrowBack} />
                        </Button>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList className={cx('list')}>
                    <IonItem>
                        <IonLabel>
                            <IonNote>Name</IonNote>
                            {user?.name}
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <IonNote>Username</IonNote>
                            {user?.username}
                        </IonLabel>
                    </IonItem>
                    <IonItem className={cx({ 'item-danger': !user?.isEmailConfirmed })}>
                        <IonLabel>
                            <IonNote>Email</IonNote>
                            {user?.email}
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
        </>
    );
};
