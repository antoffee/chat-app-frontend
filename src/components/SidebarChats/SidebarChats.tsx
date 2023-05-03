import React, { useCallback } from 'react';
import { IonButtons, IonContent, IonHeader, IonIcon, IonList, IonTitle, IonToolbar } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { useNodeUid } from 'hooks/useNodeUid';
import { optionsSharp } from 'ionicons/icons';
import { useAppSelector } from 'store';
import { useLeaveRoomMutation, useSocketsListSelector } from 'store/sockets';
import { getIsMobile } from 'store/windowSize';

import { Button } from 'components/Button';
import { ChatItem } from 'components/ChatItem';
import { useUserOptionsModal, useUserOptionsPopover } from 'components/UserOptionsModal';

import styles from './SidebarChats.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SidebarChats = () => {
    const { chats } = useSocketsListSelector();
    const { user } = useAppSelector((state) => state.auth);
    const isMobile = useAppSelector(getIsMobile);
    const uniqueId = useNodeUid();

    const { showUserOptions } = useUserOptionsModal();
    const { showUserOptions: showUserOptionsPopover } = useUserOptionsPopover();

    const [leaveRoom] = useLeaveRoomMutation();

    const handleOpenSettings = useCallback(() => {
        return isMobile ? showUserOptions() : showUserOptionsPopover({ trigger: uniqueId });
    }, [isMobile, showUserOptions, showUserOptionsPopover, uniqueId]);

    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar className={cx('toolbar')}>
                    <IonTitle>
                        {user?.name} ({user?.username})
                    </IonTitle>
                    <IonButtons slot="end">
                        <Button id={uniqueId} className={cx('toolbar-settings')} onClick={handleOpenSettings}>
                            <IonIcon slot="icon-only" icon={optionsSharp} />
                        </Button>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {chats?.map((chat) => (
                        <ChatItem
                            onDelete={leaveRoom}
                            id={chat.id}
                            date={chat?.messages?.[0]?.createdAt}
                            title={chat.name}
                            key={chat.id}
                            message={chat?.messages?.[0]?.content}
                        />
                    ))}
                </IonList>
            </IonContent>
        </>
    );
};
