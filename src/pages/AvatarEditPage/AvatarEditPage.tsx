import React, { useCallback, useEffect, useState } from 'react';
import { IonContent, IonHeader, IonLoading, IonTitle, IonToolbar } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum } from 'generated';
import { UserPhoto } from 'hooks/usePhotoGallery';
import { useAppDispatch, useAppSelector } from 'store';
import { deleteFaceInfo, saveFaceInfo, uploadAvatarAction } from 'store/auth';
import { FetchStatus } from 'types/asyncState';

import { AvatarEditor } from 'components/AvatarEditor';
import { AvatarUploader } from 'components/AvatarUploader';
import { checkFaceAnalizeStatus, scheduleFaceAnalize } from 'components/SidebarSettingsEdit/SidebarSettings.utils';

import styles from './AvatarEditPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const AvatarEditPage: React.FC = () => {
    const { user, loadingStatus } = useAppSelector((state) => state.auth);

    const isLoading = loadingStatus === FetchStatus.PENDING;

    const dispatch = useAppDispatch();

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

    const handleDeleteAvatar = useCallback(() => {
        void dispatch(deleteFaceInfo());
        setFaceInfoStatus(undefined);
    }, [dispatch]);

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Редактирование аватара</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading isOpen={faceInfoStatus === ApiCheckAnalyzeJobStatusSuccessfulResponseStatusEnum.Pending} />
            <IonContent>
                <AvatarUploader
                    onDeleteAvatar={handleDeleteAvatar}
                    isLoading={isLoading}
                    onUploadSubmit={handleUploadAvatar}
                    className={cx('list')}
                    onGenerateSubmit={scheduleFaceInfoAnalyze}
                    hasAvatar={!!user?.faceInfo}
                />
                <div className={cx('wrapper')}>
                    <AvatarEditor faceInfo={user?.faceInfo} />
                </div>
            </IonContent>
        </>
    );
};
