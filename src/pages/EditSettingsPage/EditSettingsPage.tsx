import React from 'react';
import { IonHeader } from '@ionic/react';
// import cnBind, { Argument } from 'classnames/bind';
import { ApiUserEntityResponse } from 'generated';
import { useAppSelector } from 'store';

import { ModelViewer } from 'components/ModelViewer';

import { EditSettingsPageProps } from './EditSettingsPage.types';

// import styles from './EditSettingsPage.module.scss';

// const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const EditSettingsPage: React.FC<EditSettingsPageProps> = () => {
    const _user = useAppSelector((state) => state.auth.user as ApiUserEntityResponse);

    return (
        <>
            <IonHeader />
            <ModelViewer/>
        </>
    );
};
