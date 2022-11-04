import React from 'react';
import { IonContent, IonHeader, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { useAppSelector } from 'store';

import { ChatItem } from 'components/ChatItem';

import { SidebarChatsProps } from './SidebarChats.types';

import styles from './SidebarChats.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SidebarChats = ({ id }: SidebarChatsProps) => {
    const { chatList } = useAppSelector((state) => state.chats);
    const { user } = useAppSelector((state) => state.user);

    return (
        <IonMenu contentId={id} className={cx('sidebar')}>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>
                        {user?.name} ({user?.username})
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {chatList?.map((chat) => (
                        <ChatItem date={chat.updatedAt} title={chat.name} key={chat.id} />
                    ))}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};
