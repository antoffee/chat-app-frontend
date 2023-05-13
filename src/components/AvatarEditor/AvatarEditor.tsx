import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import { IonContent } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { ApiFaceInfoEntityResponse } from 'generated';
import { useAppDispatch, useAppSelector } from 'store';
import { updateFaceInfo } from 'store/auth';
import { FetchStatus } from 'types/asyncState';

import { AvatarConstructor } from 'components/AvatarEditor/AvatarConstructor';
import { ColorParamProps } from 'components/AvatarEditor/AvatarConstructor/AvatarConstructor.types';
import { ModelViewer } from 'components/ModelViewer';
import { TextType, Typography } from 'components/Typography';

import { AvatarEditorProps } from './AvatarEditor.types';

import styles from './AvatarEditor.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const AvatarEditor: React.FC<AvatarEditorProps> = ({ faceInfo }) => {
    const dispatch = useAppDispatch();
    const { loadingStatus } = useAppSelector((state) => state.auth);
    const params: ColorParamProps[] = useMemo(
        () =>
            faceInfo
                ? [
                      {
                          title: 'Цвет волос',
                          name: 'hairColor',
                          initialValue: faceInfo?.hairColor,
                      },
                      {
                          title: 'Цвет левого глаза',
                          name: 'leftEyeColor',
                          initialValue: faceInfo.leftEyeColor,
                      },
                      {
                          title: 'Цвет правого глаза',
                          initialValue: faceInfo.rightEyeColor,
                          name: 'rightEyeColor',
                      },
                      { title: 'Цвет кожи', initialValue: faceInfo?.skinColor, name: 'skinColor' },
                  ]
                : [],
        [faceInfo],
    );

    const handleSubmitUpdate = useCallback(
        (values: Partial<ApiFaceInfoEntityResponse>) => {
            void dispatch(updateFaceInfo(values));
        },
        [dispatch],
    );

    return (
        <div className={cx('avatar-editor')}>
            {faceInfo ? (
                <Form<Partial<ApiFaceInfoEntityResponse>> onSubmit={handleSubmitUpdate}>
                    {({ values, touched, handleSubmit }) => (
                        <>
                            <ModelViewer faceInfo={{ ...faceInfo, ...values }} />
                            <AvatarConstructor
                                gender={faceInfo.gender}
                                isButtonDisabled={!touched || loadingStatus === FetchStatus.PENDING}
                                params={params}
                                onSubmit={handleSubmit}
                                loading={loadingStatus === FetchStatus.PENDING}
                            />
                        </>
                    )}
                </Form>
            ) : (
                <IonContent className={cx('avatar-editor_empty')}>
                    <Typography type={TextType.TITLE_36_48}>Пока что нет созданных аватаров</Typography>
                </IonContent>
            )}
        </div>
    );
};
