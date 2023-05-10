import React from 'react';
import { IonHeader } from '@ionic/react';
// import cnBind, { Argument } from 'classnames/bind';
import { useAppSelector } from 'store';

import { AvatarEditor } from 'components/AvatarEditor';

import { EditSettingsPageProps } from './EditSettingsPage.types';

// import styles from './EditSettingsPage.module.scss';

// const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const EditSettingsPage: React.FC<EditSettingsPageProps> = () => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <>
            <IonHeader />
            <AvatarEditor faceInfo={user?.faceInfo} />
        </>
    );
};
