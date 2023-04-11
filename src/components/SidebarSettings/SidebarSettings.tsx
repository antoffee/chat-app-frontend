import React from 'react';
import {
    IonButtons,
    IonContent,
    IonFooter,
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
import { shieldCheckmarkOutline } from 'ionicons/icons';
import { appRoutes } from 'routes';
import { useAppSelector } from 'store';

import { CustomLinkButton } from 'components/CustomLinkButton';
import { ThemeToggle } from 'components/ThemeToggle';

import styles from './SidebarChats.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SidebarSettings = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                    <IonButtons slot="start">
                        <CustomLinkButton back />
                    </IonButtons>
                    <IonButtons slot="end">
                        <CustomLinkButton iconName="createOutline" href={appRoutes.settingsEdit()}/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList className={cx('list')}>
                    <IonItem className="ion-no-border">
                        <IonLabel>
                            <IonNote>Name</IonNote>
                            {user?.name}
                        </IonLabel>
                    </IonItem>
                    <IonItem className="ion-no-border">
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
                        {user?.isEmailConfirmed && <IonIcon slot="end" color="success" icon={shieldCheckmarkOutline} />}
                    </IonItem>
                </IonList>
            </IonContent>
            <IonFooter className={cx('footer')}>
                <IonToolbar>
                    <ThemeToggle />
                </IonToolbar>
            </IonFooter>
        </>
    );
};
