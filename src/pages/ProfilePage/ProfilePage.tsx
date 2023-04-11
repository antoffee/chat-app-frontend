import React from 'react';
import { IonHeader } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';

import { ModelViewer } from 'components/ModelViewer';

import { ProfilePageProps } from './ProfilePage.types';

import styles from './ProfilePage.module.scss';

const _cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ProfilePage: React.FC<ProfilePageProps> = () => {
    return (
        <>
            <IonHeader />
            <ModelViewer/>
        </>
    );
};
