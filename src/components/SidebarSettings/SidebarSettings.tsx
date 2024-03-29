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
import { getIsMobile } from 'store/windowSize';

import { useConfirmEmailModal } from 'components/ConfirmEmailModal/ConfirmEmailModal.hooks';
import { CustomLinkButton } from 'components/CustomLinkButton';
import { ModelViewer } from 'components/ModelViewer';
import { ThemeToggle } from 'components/ThemeToggle';
import { noop } from 'utils';

import styles from './SidebarSettings.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SidebarSettings = () => {
    const { user } = useAppSelector((state) => state.auth);
    const { showConfirmEmail } = useConfirmEmailModal();
    const isMobile = useAppSelector(getIsMobile);

    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>Профиль</IonTitle>
                    <IonButtons slot="start">
                        <CustomLinkButton back />
                    </IonButtons>
                    <IonButtons slot="end">
                        <CustomLinkButton iconName="createOutline" href={appRoutes.settingsEdit(isMobile)} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList className={cx('list')}>
                    <IonItem className="ion-no-border">
                        <IonLabel>
                            <IonNote>Имя</IonNote>
                            {user?.name}
                        </IonLabel>
                    </IonItem>
                    <IonItem className="ion-no-border">
                        <IonLabel>
                            <IonNote>Username</IonNote>
                            {user?.username}
                        </IonLabel>
                    </IonItem>
                    <IonItem
                        onClick={() => (!user?.isEmailConfirmed ? showConfirmEmail() : noop)}
                        className={cx({ 'item-danger': !user?.isEmailConfirmed })}
                    >
                        <IonLabel>
                            <IonNote>Email</IonNote>
                            {user?.email}
                        </IonLabel>
                        {user?.isEmailConfirmed && <IonIcon slot="end" color="success" icon={shieldCheckmarkOutline} />}
                    </IonItem>
                </IonList>
                {isMobile && user?.faceInfo ? <ModelViewer faceInfo={user?.faceInfo} /> : null}
            </IonContent>
            <IonFooter className={cx('footer')}>
                <IonToolbar>
                    <IonItem className="ion-no-border">
                        <IonLabel>Цветовая тема</IonLabel>
                        <ThemeToggle />
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </>
    );
};
