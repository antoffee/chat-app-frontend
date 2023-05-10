import React, { useCallback } from 'react';
import {
    IonAvatar,
    IonIcon,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonNote,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { person, trash } from 'ionicons/icons';

import { ModelViewer } from 'components/ModelViewer';

import { UserItemProps } from './UserItem.types';

import styles from './UserItem.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const UserItem: React.FC<UserItemProps> = ({ user, onDelete, onUserAvatarClick, deletable }) => {
    const handleDelete = useCallback(() => {
        onDelete(user);
    }, [onDelete, user]);

    const handleUserAvatarClick = useCallback(() => {
        onUserAvatarClick(user);
    }, [onUserAvatarClick, user]);

    return (
        <IonItemSliding className={cx('user-item__sliding')}>
            {deletable && (
                <IonItemOptions side="start">
                    <IonItemOption color={'danger'} onClick={handleDelete}>
                        <div className={cx('sliding-option')}>
                            <IonIcon icon={trash} />
                        </div>
                    </IonItemOption>
                </IonItemOptions>
            )}
            <IonItem lines="none" className={cx('chat-item')}>
                <IonAvatar onClick={handleUserAvatarClick} className={cx('avatar')} slot="start">
                    {user.faceInfo ? (
                        <ModelViewer faceInfo={user.faceInfo} mode="avatar" />
                    ) : user.avatar ? (
                        <img src={user.avatar.path} />
                    ) : (
                        <IonIcon icon={person} />
                    )}
                </IonAvatar>
                <IonLabel>
                    <h2>{user.name}</h2>
                    <IonNote>{user.username}</IonNote>
                </IonLabel>
            </IonItem>
        </IonItemSliding>
    );
};
