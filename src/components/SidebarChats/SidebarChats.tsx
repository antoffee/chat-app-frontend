import React from 'react';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonMenu,
    IonPopover,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { useNodeUid } from 'hooks/useNodeUid';
import { chevronDown } from 'ionicons/icons';
import { appRoutes } from 'routes';
import { useAppSelector } from 'store';
import { useConnectQueryState } from 'store/sockets';

import { Button } from 'components/Button';
import { ChatItem } from 'components/ChatItem';

import { SidebarChatsProps } from './SidebarChats.types';

import styles from './SidebarChats.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SidebarChats = ({ id }: SidebarChatsProps) => {
    const { data } = useConnectQueryState();
    const { user } = useAppSelector((state) => state.auth);
    const uniqueId = useNodeUid();

    return (
        <IonMenu contentId={id} className={cx('sidebar')}>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>
                        {user?.name} ({user?.username})
                    </IonTitle>
                    <IonButtons slot="end">
                        <Button id={uniqueId}>
                            <IonIcon slot="icon-only" icon={chevronDown} />
                        </Button>
                        <IonPopover side="bottom" alignment="end" trigger={uniqueId} triggerAction="click">
                            <IonContent>
                                <IonList>
                                    <IonItem href={appRoutes.settings()}>Settings</IonItem>
                                    <IonItem>Create new chat</IonItem>
                                </IonList>
                            </IonContent>
                        </IonPopover>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {data?.map((chat) => (
                        <ChatItem
                            id={chat.id}
                            date={chat?.messages?.[0]?.createdAt}
                            title={chat.name}
                            key={chat.id}
                            message={chat?.messages?.[0]?.content}
                        />
                    ))}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};
