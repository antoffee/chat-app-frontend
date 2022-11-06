import React from 'react';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { PageLayout } from 'layouts/PageLayout';

import styles from './ChatDetailsPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ChatDetailsPage = () => {
    return (
        <PageLayout>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle />
                </IonToolbar>
            </IonHeader>
            <div className={cx('chat-detail')} />
        </PageLayout>
    );
};
