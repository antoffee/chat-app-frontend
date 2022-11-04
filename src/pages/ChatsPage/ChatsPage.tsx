import React from 'react';
import { IonHeader, IonToolbar } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { PageLayout } from 'layouts/PageLayout';
import { useAppSelector } from 'store';

import { ChatItem } from 'components/ChatItem';
import { CustomInput } from 'components/CustomInput';

import styles from './ChatsPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ChatsPage = () => {
    const { chatList } = useAppSelector((state) => state.chats);

    return (
        <PageLayout>
            <IonHeader translucent className={cx('chats-header', 'ion-no-border')}>
                <IonToolbar>
                    <CustomInput inputType="input" />
                </IonToolbar>
            </IonHeader>
            {chatList?.map((chat) => (
                <ChatItem date={chat.updatedAt} title={chat.name} key={chat.id} />
            ))}
        </PageLayout>
    );
};
