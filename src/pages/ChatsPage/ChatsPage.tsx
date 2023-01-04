import React from 'react';
import { IonContent } from '@ionic/react';

import { SidebarChats } from 'components/SidebarChats';

export const ChatsPage = () => {
    return (
        <IonContent>
            <SidebarChats />
        </IonContent>
    );
};
