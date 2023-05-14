import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import {
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonLoading,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum } from 'generated';
import { UserPhoto } from 'hooks/usePhotoGallery';
import { appRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { deleteFaceInfo, saveFaceInfo, updateProfileAction, uploadAvatarAction } from 'store/auth';
import { getIsMobile } from 'store/windowSize';
import { FetchStatus } from 'types/asyncState';

import { AvatarUploader } from 'components/AvatarUploader';
import { Button } from 'components/Button';
import { CustomLinkButton } from 'components/CustomLinkButton';
import { CustomInputField } from 'components/Fields/CustomInputField';
import {
    checkFaceAnalizeStatus,
    scheduleFaceAnalize,
    validateEdit,
} from 'components/SidebarSettingsEdit/SidebarSettings.utils';
import { EditSettingsValues } from 'components/SidebarSettingsEdit/SidebarSettingsEdit.types';
import { ThemeToggle } from 'components/ThemeToggle';

import styles from './SidebarSettingsEdit.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const SidebarSettingsEdit = () => {
    const { user, loadingStatus } = useAppSelector((state) => state.auth);

    const isLoading = loadingStatus === FetchStatus.PENDING;

    const isMobile = useAppSelector(getIsMobile);

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

    const initialValues = useMemo(
        () => ({ name: user?.name, username: user?.username, email: user?.email }),
        [user?.email, user?.name, user?.username],
    );

    const handleUploadAvatar = useCallback(
        (photo?: UserPhoto) => {
            const path = photo?.webviewPath;
            if (path) {
                void dispatch(
                    uploadAvatarAction({ filePath: path, mimeType: photo?.mimeType, fileName: photo?.filepath }),
                );
            }
        },
        [dispatch],
    );

    const [faceInfoStatus, setFaceInfoStatus] = useState<ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum>();

    const [jobId, setJobId] = useState<string | null>(null);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | null = null;
        if (
            typeof jobId === 'string' &&
            faceInfoStatus === ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Pending
        ) {
            timer = setInterval(() => {
                checkFaceAnalizeStatus(jobId)
                    .then(({ status, result }) => {
                        setFaceInfoStatus(status);
                        switch (status) {
                            case ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Cancelled:
                                // !TODO: handle error
                                setJobId(null);
                                setFaceInfoStatus(ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Cancelled);
                                break;
                            case ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Done:
                                // !TODO: handle done with result
                                setJobId(null);
                                setFaceInfoStatus(ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Done);
                                dispatch(saveFaceInfo(result));
                        }
                    })
                    .catch(console.error);
            }, 2000);
        }

        return () => {
            if (timer !== null) {
                clearInterval(timer);
            }
        };
    }, [dispatch, faceInfoStatus, jobId]);

    // na sunmit
    const scheduleFaceInfoAnalyze = useCallback(async (photo: UserPhoto) => {
        setFaceInfoStatus(ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Pending);
        const { jobId } = await scheduleFaceAnalize({
            fileName: photo.filepath,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            filePath: photo.webviewPath!,
            mimeType: photo.mimeType,
        });
        setJobId(jobId);
    }, []);

    const handleDeleteAvatar = useCallback(() => dispatch(deleteFaceInfo()), [dispatch]);

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
                <IonLoading isOpen={faceInfoStatus === ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Pending} />
                <Form validate={validateEdit} initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ handleSubmit, valid }) => (
                        <IonList className={cx('list')}>
                            <CustomInputField inputType="input" name="name" label="Имя" />
                            <CustomInputField inputType="input" name="username" label="Username" />
                            <CustomInputField inputType="input" name="email" label="Адрес эл. почты" />

                            <Button onClick={handleSubmit} disabled={!valid || isLoading}>
                                Сохранить изменения
                            </Button>
                            {isMobile && (
                                <Button onClick={() => router.push(appRoutes.avatarEditMobile())} color={'secondary'}>
                                    Редактирование аватара
                                </Button>
                            )}
                        </IonList>
                    )}
                </Form>

                {!isMobile && (
                    <AvatarUploader
                        onDeleteAvatar={handleDeleteAvatar}
                        isLoading={isLoading}
                        onUploadSubmit={handleUploadAvatar}
                        className={cx('list')}
                        onGenerateSubmit={scheduleFaceInfoAnalyze}
                        hasAvatar={!!user?.faceInfo}
                    />
                )}
            </IonContent>
            <IonFooter className={cx('footer')}>
                <IonToolbar>
                    <IonItem>
                        <IonLabel>Цветовая тема</IonLabel>
                        <ThemeToggle />
                    </IonItem>
                </IonToolbar>
            </IonFooter>
        </>
    );
};
