import React, { useMemo } from 'react';
import {
    IonAvatar,
    IonBadge,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonNote,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { chatbubble, person, pin, trash } from 'ionicons/icons';
import moment from 'moment';
import { appRoutes } from 'routes';

import { ChatItemProps } from './ChatItem.types';

import styles from './ChatItem.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ChatItem = ({
    date,
    title,
    image,
    pinned,
    unreadCount,
    message,
    onDelete,
    onMakeRead,
    id,
}: ChatItemProps) => {
    const formattedDate = useMemo(
        () => (moment(date).isBefore(new Date()) ? moment(date).format('DD MMM, hh:mm') : moment(date).format('hh:mm')),
        [date],
    );

    return (
        <IonItemSliding className={cx('chat-item__sliding')}>
            <IonItemOptions side="start">
                <IonItemOption color={'danger'} onClick={onDelete}>
                    <div className={cx('sliding-option')}>
                        <IonIcon icon={trash} />
                    </div>
                </IonItemOption>
            </IonItemOptions>
            <IonItem routerLink={appRoutes.chatDetails(id)} lines="none" className={cx('chat-item')}>
                <IonAvatar className={cx('avatar')} slot="start">
                    {image ? <img src={image} /> : <IonIcon icon={person} />}
                </IonAvatar>
                <IonLabel>
                    <h2>{title}</h2>
                    <IonNote>{message}</IonNote>
                </IonLabel>
                <div className={cx('chat-item__end')} slot="end">
                    {date && <IonNote>{formattedDate}</IonNote>}
                    {unreadCount && <IonBadge className={cx('chat-item__badge')}>+{unreadCount}</IonBadge>}
                </div>
                {pinned && <IonIcon slot="end" icon={pin} />}
            </IonItem>
            <IonItemOptions side="end">
                <IonItemOption onClick={onMakeRead}>
                    <div className={cx('sliding-option')}>
                        <IonIcon icon={chatbubble} />
                    </div>
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    );
};
