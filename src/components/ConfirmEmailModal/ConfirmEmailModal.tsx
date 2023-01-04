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
                                Email will be sent to <b>{user?.email}</b>
                            </IonLabel>
                        </IonItem>
                        <Button onClick={sendConfirmation}>Send email</Button>
                        <IonItem>
                            <IonLabel>Incorrect email address?</IonLabel>
                            <Button fill="clear" size="large" href={appRoutes.settings()}>
                                Change
                            </Button>
                        </IonItem>
                    </>
                );
            case ConfirmEmailStep.CONFIRM_CODE:
                return (
                    <>
                        <IonItem>
                            <IonLabel>
                                Follow the instructions in the email sent to <b>{user?.email}</b>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel> Did not get the email? Check your spam folder or</IonLabel>
                        </IonItem>
                        <Button fill="clear" size="large" onClick={sendConfirmation}>
                            Resend confirmation
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
                    <Typography type={TextType.CAPTION_18_24}>Confirm Email</Typography>
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
