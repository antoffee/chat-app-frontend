import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { IonHeader, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { PageLayout } from 'layouts/PageLayout';
import { useAppSelector } from 'store';
import { useGetRoomDetailsQuery } from 'store/sockets';

import { ChatMessage } from 'components/ChatMessage';

import styles from './ChatDetailsPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ChatDetailsPage = () => {
    const user = useAppSelector((state) => state.user?.user);
    const { id } = useParams<{ id: string }>();
    const { data, isFetching } = useGetRoomDetailsQuery(id, {
        skip: !id,
    });

    const title = useMemo(
        () => data?.name ?? data?.members?.find((member) => member?.id !== user?.id)?.name,
        [data?.members, data?.name, user?.id],
    );

    return (
        <PageLayout>
            <IonHeader className={cx('ion-no-border')}>
                <IonToolbar className={cx('chat-detail__header')}>
                    <IonTitle>{title}</IonTitle>
                    <IonTitle>{data?.description}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <div className={cx('chat-detail')}>
                {isFetching && <IonSpinner />}
                {!isFetching &&
                    data?.messages?.map((message) => (
                        <ChatMessage
                            key={message.id}
                            message={message.content}
                            type={user?.id === message?.authorEntityId ? 'outcoming' : 'incoming'}
                        />
                    ))}
            </div>
        </PageLayout>
    );
};
