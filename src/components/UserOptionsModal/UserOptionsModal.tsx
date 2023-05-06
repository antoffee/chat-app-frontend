import React from 'react';
import { IonContent, IonIcon, IonItem, IonList } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { createOutline, logOutOutline, settingsOutline } from 'ionicons/icons';
import { useAppDispatch } from 'store';
import { logoutAction } from 'store/auth';

import { usePresentChatModal } from 'components/CreateChatModal';

import styles from './UserOptionsModal.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const UserOptionsModal = ({ onSettingsClick }: { onSettingsClick?: () => void }) => {
    const dispatch = useAppDispatch();

    const { showCreateChat } = usePresentChatModal({});

    return (
        <IonContent>
            <IonList>
                <IonItem detail={false} button onClick={onSettingsClick}>
                    <IonIcon icon={settingsOutline} slot="start" />
                    Settings
                </IonItem>
                <IonItem detail={false} button onClick={() => showCreateChat()}>
                    <IonIcon icon={createOutline} slot="start" />
                    Create new chat
                </IonItem>
                <IonItem className={cx('item-danger')} detail={false} button onClick={() => dispatch(logoutAction())}>
                    <IonIcon icon={logOutOutline} slot="start" />
                    Logout
                </IonItem>
            </IonList>
        </IonContent>
    );
};
