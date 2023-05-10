import React, { useCallback, useState } from 'react';
import { IonActionSheet, IonCol, IonGrid, IonIcon, IonImg, IonList, IonRow } from '@ionic/react';
// import cnBind, { Argument } from 'classnames/bind';
import { usePhotoGallery, UserPhoto } from 'hooks/usePhotoGallery';
import { camera, close, trash } from 'ionicons/icons';

import { Button } from 'components/Button';
import { TextType, Typography } from 'components/Typography';

import { AvatarUploaderProps } from './AvatarUploader.types';

// import styles from './AvatarUploader.module.scss';

// const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
    isLoading,
    className,
    onUploadSubmit,
    onGenerateSubmit,
    hasAvatar,
    onDeleteAvatar,
}) => {
    const { deletePhoto, photos, takePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

    const handleUpload = useCallback(() => {
        onUploadSubmit?.(photos[0]);
    }, [onUploadSubmit, photos]);

    const handleGenerate = useCallback(() => {
        onGenerateSubmit?.(photos[0]);
    }, [onGenerateSubmit, photos]);

    return (
        <>
            <IonList className={className}>
                <Typography type={TextType.CAPTION_16_24}>Аватар</Typography>
                <IonGrid>
                    <IonRow>
                        {photos.map((photo, index) => (
                            <IonCol size="6" key={index}>
                                <IonImg alt="Аватар" onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
                {hasAvatar ? (
                    <Button onClick={onDeleteAvatar} loading={isLoading} disabled={isLoading} color={'danger'}>
                        Удалить аватар
                    </Button>
                ) : !photos?.length ? (
                    <Button onClick={() => takePhoto()}>
                        <IonIcon icon={camera} />
                    </Button>
                ) : (
                    <>
                        <Button loading={isLoading} disabled={isLoading} onClick={handleGenerate}>
                            {'Сгенерировать 3D аватар по фотографии'}
                        </Button>
                        <Button loading={isLoading} disabled={isLoading} color={'secondary'} onClick={handleUpload}>
                            {'Сделать фотографией профиля'}
                        </Button>
                    </>
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
        </>
    );
};
