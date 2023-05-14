import React from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { close } from 'ionicons/icons';

import { ModelViewer } from 'components/ModelViewer';
import { TextType, Typography } from 'components/Typography';

import { AvatarModalProps } from './AvatarModal.types';

export const AvatarModal: React.FC<AvatarModalProps> = ({ onDismiss, faceInfo }) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <Typography type={TextType.CAPTION_18_24}>Аватар</Typography>
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onDismiss}>
                            <IonIcon icon={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>{!!faceInfo && <ModelViewer faceInfo={faceInfo} />}</IonContent>
        </IonPage>
    );
};
