import React, { useCallback, useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import {
    IonActionSheet,
    IonButtons,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonList,
    IonRow,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { camera, close, trash } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from 'store';
import { updateProfileAction, uploadAvatarAction } from 'store/auth';
import { FetchStatus } from 'types/asyncState';

import { Button } from 'components/Button';
import { CustomLinkButton } from 'components/CustomLinkButton';
import { CustomInputField } from 'components/Fields/CustomInputField';
import { validateEdit } from 'components/SidebarSettingsEdit/SidebarSettings.utils';
import { EditSettingsValues } from 'components/SidebarSettingsEdit/SidebarSettingsEdit.types';
import { usePhotoGallery, UserPhoto } from 'components/SidebarSettingsEdit/usePhotoGallery';
import { ThemeToggle } from 'components/ThemeToggle';
import { TextType, Typography } from 'components/Typography';

import styles from './SidebarSettingsEdit.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SidebarSettingsEdit = () => {
    const { user, loadingStatus } = useAppSelector((state) => state.auth);

    const isLoading = loadingStatus === FetchStatus.PENDING;

    const router = useIonRouter();

    const dispatch = useAppDispatch();

    const handleSubmit = useCallback(
        (values: EditSettingsValues) => {
            dispatch(updateProfileAction(values))
                .then(() => {
                    router.goBack();
                })
                .catch(console.error);
        },
        [dispatch, router],
    );

    const { deletePhoto, photos, takePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

    const initialValues = useMemo(
        () => ({ name: user?.name, username: user?.username, email: user?.email }),
        [user?.email, user?.name, user?.username],
    );

    const handleGenerateAvatar = useCallback(() => {
        const path = photos[0]?.webviewPath;
        if (path) {
            void dispatch(
                uploadAvatarAction({ filePath: path, mimeType: photos[0]?.mimeType, fileName: photos[0]?.filepath }),
            );
        }
    }, [dispatch, photos]);

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

                            <Button onClick={handleSubmit} disabled={!valid || isLoading}>
                                Сохранить изменения
                            </Button>
                        </IonList>
                    )}
                </Form>
                <IonList className={cx('list')}>
                    <Typography type={TextType.CAPTION_16_24}>Аватар</Typography>
                    <IonGrid>
                        <IonRow>
                            {photos.map((photo, index) => (
                                <IonCol size="6" key={index}>
                                    <IonImg
                                        alt="Аватар"
                                        onClick={() => setPhotoToDelete(photo)}
                                        src={photo.webviewPath}
                                    />
                                </IonCol>
                            ))}
                        </IonRow>
                    </IonGrid>
                    {!photos?.length ? (
                        <Button onClick={() => takePhoto()}>
                            <IonIcon icon={camera} />
                        </Button>
                    ) : (
                        <Button loading={isLoading} disabled={isLoading} onClick={handleGenerateAvatar}>
                            Создать аватар
                        </Button>
                    )}
                </IonList>
                <IonActionSheet
                    isOpen={!!photoToDelete}
                    buttons={[
                        {
                            text: 'Удалить',
                            role: 'destructive',
                            icon: trash,
                            handler: () => {
                                if (photoToDelete) {
                                    void deletePhoto(photoToDelete);
                                    setPhotoToDelete(undefined);
                                }
                            },
                        },
                        {
                            text: 'Отмена',
                            icon: close,
                            role: 'cancel',
                        },
                    ]}
                    onDidDismiss={() => setPhotoToDelete(undefined)}
                />
            </IonContent>
            <IonFooter className={cx('footer')}>
                <IonToolbar>
                    <ThemeToggle />
                </IonToolbar>
            </IonFooter>
        </>
    );
};
