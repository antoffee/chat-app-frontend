import React from 'react';
import { IonContent, IonHeader } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { useAppSelector } from 'store';

import { ModelViewer } from 'components/ModelViewer';
import { TextType, Typography } from 'components/Typography';

import { ProfilePageProps } from './ProfilePage.types';

import styles from './ProfilePage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ProfilePage: React.FC<ProfilePageProps> = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <>
            <IonHeader />
            {user?.faceInfo ? (
                <ModelViewer faceInfo={user?.faceInfo} />
            ) : (
                <IonContent className={cx('profile-page_empty')}>
                    <Typography type={TextType.TITLE_36_48}>Пока что нет созданных аватаров</Typography>
                </IonContent>
            )}
        </>
    );
};
