import React, { useCallback, useMemo, useState } from 'react';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { EmailApi } from 'generated';
import { close } from 'ionicons/icons';
import { appRoutes } from 'routes';
import { useAppSelector } from 'store';

import { Button } from 'components/Button';
import { TextType, Typography } from 'components/Typography';

import { ConfirmEmailModalProps, ConfirmEmailStep } from './ConfirmEmailModal.types';

import styles from './ConfirmEmailModal.module.scss';

const emailApi = new EmailApi();

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ConfirmEmailModal = ({ onDismiss, initialStep }: ConfirmEmailModalProps) => {
    const { user } = useAppSelector((state) => state.auth);

    const [step, setStep] = useState(initialStep ?? ConfirmEmailStep.SEND_CODE);

    const sendConfirmation = useCallback(async () => {
        await emailApi.emailControllerResendConfirmationLink().then(() => setStep(ConfirmEmailStep.CONFIRM_CODE));
    }, []);

    const renderStepContent = useMemo(() => {
        switch (step) {
            case ConfirmEmailStep.SEND_CODE:
                return (
                    <>
                        <IonItem>
                            <IonLabel>
                                Письмо будет отправлено на <b>{user?.email}</b>
                            </IonLabel>
                        </IonItem>
                        <Button onClick={sendConfirmation}>Отправить письмо</Button>
                        <IonItem>
                            <IonLabel>Неправильный адрес?</IonLabel>
                            <Button fill="clear" size="large" href={appRoutes.settings()}>
                                Изменить
                            </Button>
                        </IonItem>
                    </>
                );
            case ConfirmEmailStep.CONFIRM_CODE:
                return (
                    <>
                        <IonItem>
                            <IonLabel>
                                Следуйте инструкциям, отправленным на <b>{user?.email}</b>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel> Не получили письмо? Проверьте папку СПАМ или</IonLabel>
                        </IonItem>
                        <Button fill="clear" size="large" onClick={sendConfirmation}>
                            Отправить повторно
                        </Button>
                    </>
                );
            default:
                return null;
        }
    }, [sendConfirmation, step, user?.email]);

    return (
        <>
            <IonToolbar>
                <IonTitle>
                    <Typography type={TextType.CAPTION_18_24}>Подтвердить e-mail</Typography>
                </IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={onDismiss}>
                        <IonIcon icon={close} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonContent>
                <IonList lines="none" className={cx('confirm-email__form')}>
                    {renderStepContent}
                </IonList>
            </IonContent>
        </>
    );
};
