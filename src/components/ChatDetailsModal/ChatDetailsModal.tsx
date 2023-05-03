import React from 'react';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonNote,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import moment from 'moment';
import { useAppSelector } from 'store';
import { useLeaveRoomMutation, useRoomDetailsState } from 'store/sockets';

import { Button } from 'components/Button';
import { UserItem } from 'components/ChatDetailsModal/UserItem';
import { TextType, Typography } from 'components/Typography';
import { noop } from 'utils';

import { ChatDetailsModalProps } from './ChatDetailsModal.types';

export const ChatDetailsModal: React.FC<ChatDetailsModalProps> = ({ onDismiss, id }) => {
    const { data } = useRoomDetailsState(id);

    const { user } = useAppSelector((state) => state.auth);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const isOwner = user?.id === data.ownerId || true;

    const [leaveRoom] = useLeaveRoomMutation();

    if (!data) {
        return null;
    }

    return (
        <>
            <IonToolbar>
                <IonTitle>
                    <Typography type={TextType.CAPTION_18_24}>{data?.name}</Typography>
                </IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={onDismiss}>
                        <IonIcon icon={close} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonContent>
                <IonList>
                    <IonItem className="ion-no-border">
                        <IonLabel>
                            <IonNote>Описание</IonNote>
                            {data?.description}
                        </IonLabel>
                    </IonItem>
                    <IonItem className="ion-no-border">
                        <IonLabel>
                            <IonNote>Дата создания</IonNote>
                            {moment(data?.createdAt).format('DD MMM, HH:mm')}
                        </IonLabel>
                    </IonItem>
                    <IonItem className="ion-no-border">
                        <IonLabel>
                            <IonNote>Участники ({data?.members.length})</IonNote>
                            <IonList>
                                {data?.members.map((member) => {
                                    return (
                                        <UserItem
                                            key={member.id}
                                            user={member}
                                            onDelete={noop}
                                            onUserAvatarClick={noop}
                                            deletable={isOwner}
                                        />
                                    );
                                })}
                            </IonList>
                        </IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
            <IonFooter>
                {isOwner && <Button size="default">Добавить в чат</Button>}
                <Button
                    onClick={() => {
                        void leaveRoom({ roomId: data?.id });
                        onDismiss?.();
                    }}
                    size="default"
                    color={'danger'}
                >
                    Выйти из чата
                </Button>
            </IonFooter>
        </>
    );
};
