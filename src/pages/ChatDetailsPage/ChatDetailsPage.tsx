import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Form } from 'react-final-form';
import { useParams } from 'react-router-dom';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { FormApi } from 'final-form';
import { send } from 'ionicons/icons';
import { SendMessageValues } from 'pages/ChatDetailsPage/ChatDetailsPage.types';
import { validateSendMessage } from 'pages/ChatDetailsPage/ChatDetailsPage.utils';
import { useAppSelector } from 'store';
import { useGetRoomDetailsQuery, useSendMessageMutation } from 'store/sockets';

import { Button } from 'components/Button';
import { ChatMessage } from 'components/ChatMessage';
import { CustomInputField } from 'components/Fields/CustomInputField';
import { sleep } from 'utils';

import styles from './ChatDetailsPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ChatDetailsPage = () => {
    const user = useAppSelector((state) => state.auth?.user);

    const [sendMessage] = useSendMessageMutation();

    const { id } = useParams<{ id: string }>();
    const { data, isFetching } = useGetRoomDetailsQuery(id, {
        skip: !id,
    });

    const title = useMemo(
        () => data?.name ?? data?.members?.find((member) => member?.username !== user?.username)?.name,
        [data?.members, data?.name, user?.username],
    );

    const handleSubmit = useCallback(
        async (values: SendMessageValues, form: FormApi<SendMessageValues>) => {
            await sendMessage({ ...values, roomId: +id });
            form.reset();
        },
        [id, sendMessage],
    );

    const contentRef = useRef<HTMLIonContentElement>(null);

    const scrollToBottom = useCallback(async () => {
        await sleep(100);
        const scrollPos = await contentRef.current?.getScrollElement().then((el) => el.scrollHeight);
        contentRef.current?.scrollByPoint(0, scrollPos ?? 0, 700).catch(console.error);
    }, []);

    useEffect(() => {
        void scrollToBottom();
    }, [data, scrollToBottom]);

    return (
        <>
            <IonHeader mode="md" translucent className={cx('ion-no-border', 'chat-detail__header')}>
                <IonToolbar className={cx('chat-detail__header-toolbar')}>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>{title}</IonTitle>
                    <IonTitle>{data?.description}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent ref={contentRef}>
                <div className={cx('chat-detail')}>
                    {isFetching && <IonSpinner />}
                    {!isFetching &&
                        data?.messages?.map((message) => (
                            <ChatMessage
                                key={message.id}
                                message={message.content}
                                type={user?.id === message?.authorEntityId ? 'outcoming' : 'incoming'}
                            />
                        ))}
                </div>
            </IonContent>
            <IonFooter mode="md" className={cx('chat-detail__footer')} translucent>
                <Form<SendMessageValues> validate={validateSendMessage} onSubmit={handleSubmit}>
                    {({ handleSubmit, valid }) => (
                        <IonToolbar className={cx('chat-detail__footer-toolbar')}>
                            <CustomInputField name="content" placeholder="Type something..." inputType="input" />
                            <Button disabled={!valid} slot="end" size="large" onClick={handleSubmit} shape="round">
                                <IonIcon slot="icon-only" icon={send} />
                            </Button>
                        </IonToolbar>
                    )}
                </Form>
            </IonFooter>
        </>
    );
};
