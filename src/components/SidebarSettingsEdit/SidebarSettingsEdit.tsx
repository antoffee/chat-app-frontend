import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import {
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonList,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { appRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { updateProfileAction } from 'store/auth';

import { Button } from 'components/Button';
import { CustomLinkButton } from 'components/CustomLinkButton';
import { CustomInputField } from 'components/Fields/CustomInputField';
import { validateEdit } from 'components/SidebarSettingsEdit/SidebarSettings.utils';
import { EditSettingsValues } from 'components/SidebarSettingsEdit/SidebarSettingsEdit.types';
import { ThemeToggle } from 'components/ThemeToggle';

import styles from './SidebarSettingsEdit.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SidebarSettingsEdit = () => {
    const { user } = useAppSelector((state) => state.auth);

    const router = useIonRouter();

    const dispatch = useAppDispatch();

    const handleSubmit = useCallback(
        (values: EditSettingsValues) => {
            dispatch(updateProfileAction(values)).then(() => {
                router.push(appRoutes.settings());
            }).catch(console.error);
        },
        [dispatch, router],
    );

    const initialValues = useMemo(
        () => ({ name: user?.name, username: user?.username, email: user?.email }),
        [user?.email, user?.name, user?.username],
    );

    return (
        <>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonTitle>Редактирование профиля</IonTitle>
                    <IonButtons slot="start">
                        <CustomLinkButton back />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Form validate={validateEdit} initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ handleSubmit, valid }) => (
                        <IonList className={cx('list')}>
                            <CustomInputField inputType="input" name="name" label="Имя" />
                            <CustomInputField inputType="input" name="username" label="Username" />
                            <CustomInputField inputType="input" name="email" label="Адрес эл. почты" />

                            <Button size="large" onClick={handleSubmit} disabled={!valid}>
                                Сохранить изменения
                            </Button>
                        </IonList>
                    )}
                </Form>
            </IonContent>
            <IonFooter className={cx('footer')}>
                <IonToolbar>
                    <ThemeToggle />
                </IonToolbar>
            </IonFooter>
        </>
    );
};
