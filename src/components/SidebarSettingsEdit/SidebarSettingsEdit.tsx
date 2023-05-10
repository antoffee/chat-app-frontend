import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import {
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonList,
    IonLoading,
    IonTitle,
    IonToolbar,
    useIonRouter,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum } from 'generated';
import { UserPhoto } from 'hooks/usePhotoGallery';
import { useAppDispatch, useAppSelector } from 'store';
import { updateFaceInfo, updateProfileAction, uploadAvatarAction } from 'store/auth';
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

    const [faceInfoStatus, setFaceInfoStatus] = useState<ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum>(
        ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Pending,
    );

    const [jobId, setJobId] = useState<string | null>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
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
                                setFaceInfoStatus(ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Pending);
                                break;
                            case ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Done:
                                // !TODO: handle done with result
                                setJobId(null);
                                setFaceInfoStatus(ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Pending);
                                dispatch(updateFaceInfo(result));
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
        const { jobId } = await scheduleFaceAnalize({
            fileName: photo.filepath,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            filePath: photo.webviewPath!,
            mimeType: photo.mimeType,
        });
        setJobId(jobId);
    }, []);

    return (
        <>
            <IonLoading isOpen={faceInfoStatus === ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Pending} />
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
                <AvatarUploader
                    isLoading={isLoading}
                    onUploadSubmit={handleUploadAvatar}
                    className={cx('list')}
                    onGenerateSubmit={scheduleFaceInfoAnalyze}
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
