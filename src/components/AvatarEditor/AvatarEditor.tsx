import React, { useMemo } from 'react';
import { Form } from 'react-final-form';
import { IonContent } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { ApiFaceInfoEntityResponse } from 'generated';

import { AvatarConstructor } from 'components/AvatarEditor/AvatarConstructor';
import { ColorParamProps } from 'components/AvatarEditor/AvatarConstructor/AvatarConstructor.types';
import { ModelViewer } from 'components/ModelViewer';
import { TextType, Typography } from 'components/Typography';
import { colorNameToHex, noop, rgbStrToHex } from 'utils';

import { AvatarEditorProps } from './AvatarEditor.types';

import styles from './AvatarEditor.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const AvatarEditor: React.FC<AvatarEditorProps> = ({ faceInfo }) => {
    const params: ColorParamProps[] = useMemo(
        () =>
            faceInfo
                ? [
                      {
                          title: 'Цвет волос',
                          name: 'hairColor',
                          initialValue: rgbStrToHex(faceInfo?.hairColor),
                      },
                      {
                          title: 'Цвет левого глаза',
                          name: 'leftEyeColor',
                          initialValue: colorNameToHex(faceInfo.leftEyeColor),
                      },
                      {
                          title: 'Цвет правого глаза',
                          initialValue: colorNameToHex(faceInfo.rightEyeColor),
                          name: 'rightEyeColor',
                      },
                      { title: 'Цвет кожи', initialValue: rgbStrToHex(faceInfo?.skinColor), name: 'skinColor' },
                  ]
                : [],
        [faceInfo],
    );

    return (
        <div className={cx('avatar-editor')}>
            {faceInfo ? (
                <Form<Partial<ApiFaceInfoEntityResponse>> onSubmit={noop}>
                    {({ values, modifiedSinceLastSubmit }) => (
                        <>
                            <ModelViewer faceInfo={{ ...faceInfo, ...values }} />
                            <AvatarConstructor dirty={modifiedSinceLastSubmit} params={params} />
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
