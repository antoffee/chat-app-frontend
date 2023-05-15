import React, { useCallback, useMemo } from 'react';
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
import { ApiChatRoomEntityDetailsResponseTypeEnum, ApiUserEntityWithFaceInfoResponse } from 'generated';
import { close, createOutline } from 'ionicons/icons';
import moment from 'moment';
import { useAppSelector } from 'store';
import { useLeaveRoomMutation, useRoomDetailsState } from 'store/sockets';

import { usePresentAddToChatModal } from 'components/AddToChatModal/AddToChatModal.hooks';
import { Button } from 'components/Button';
import { UserItem } from 'components/ChatDetailsModal/UserItem';
import { usePresentChatModal } from 'components/CreateChatModal';
import { TextType, Typography } from 'components/Typography';
import { noop } from 'utils';

import { ChatDetailsModalProps } from './ChatDetailsModal.types';

export const ChatDetailsModal: React.FC<ChatDetailsModalProps> = ({ onDismiss, id }) => {
    const { data } = useRoomDetailsState(id);

    const { user } = useAppSelector((state) => state.auth);

    const isOwner = user?.id === data?.ownerId;

    const [leaveRoom] = useLeaveRoomMutation();

    const handleRemoveUser = useCallback(
        (user?: ApiUserEntityWithFaceInfoResponse) => {
            void leaveRoom({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
                roomId: data?.id!,
                isPrivate: data?.type === ApiChatRoomEntityDetailsResponseTypeEnum.PRIVATE,
                userId: user?.id,
            });
        },
        [data?.id, data?.type, leaveRoom],
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
    const { showAddToChat } = usePresentAddToChatModal({ roomId: data?.id! });
    const { showCreateChat } = usePresentChatModal({
        roomId: +id,
        initialValues: { name: data?.name, description: data?.description },
        isEdit: true,
    });

    const name = useMemo(
        () => data?.name ?? data?.members.find((mem) => mem.id !== user?.id)?.name,
        [data?.members, data?.name, user?.id],
    );

    if (!data) {
        return null;
    }

    return (
        <>
            <IonToolbar>
                <IonTitle>
                    <Typography type={TextType.CAPTION_18_24}>
                        {name} (
                        {data.type === ApiChatRoomEntityDetailsResponseTypeEnum.PRIVATE ? 'Личный' : 'Групповой'})
                    </Typography>
                </IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={() => showCreateChat()}>
                        <IonIcon slot="icon-only" icon={createOutline} />
                    </IonButton>
                    <IonButton onClick={onDismiss}>
                        <IonIcon slot="icon-only" icon={close} />
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
                                            user={member as unknown as ApiUserEntityWithFaceInfoResponse}
                                            onDelete={handleRemoveUser}
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
                {isOwner && data.type !== ApiChatRoomEntityDetailsResponseTypeEnum.PRIVATE && (
                    <Button size="default" onClick={() => showAddToChat()}>
                        Добавить в чат
                    </Button>
                )}
                <Button
                    onClick={() => {
                        void leaveRoom({
                            roomId: data?.id,
                            isPrivate: data.type === ApiChatRoomEntityDetailsResponseTypeEnum.PRIVATE,
                        });
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
