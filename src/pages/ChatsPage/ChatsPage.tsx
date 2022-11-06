import React from 'react';
import { IonHeader, IonToolbar } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { PageLayout } from 'layouts/PageLayout';
import { useConnectQueryState } from 'store/sockets';

import { ChatItem } from 'components/ChatItem';
import { CustomInput } from 'components/CustomInput';

import styles from './ChatsPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ChatsPage = () => {
    const { data } = useConnectQueryState();

    return (
        <PageLayout>
            <IonHeader translucent className={cx('chats-header', 'ion-no-border')}>
                <IonToolbar>
                    <CustomInput inputType="input" />
                </IonToolbar>
            </IonHeader>
            {data?.map((chat) => (
                <ChatItem id={chat.id} date={chat.updatedAt} title={chat.name} key={chat.id} />
            ))}
        </PageLayout>
    );
};
