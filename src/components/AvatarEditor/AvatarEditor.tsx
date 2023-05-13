import React from 'react';
import { IonContent } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';

import { ModelViewer } from 'components/ModelViewer';
import { TextType, Typography } from 'components/Typography';

import { AvatarEditorProps } from './AvatarEditor.types';

import styles from './AvatarEditor.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const AvatarEditor: React.FC<AvatarEditorProps> = ({ faceInfo }) => {
    return (
        <div className={cx('avatar-editor')}>
            {faceInfo ? (
                <ModelViewer faceInfo={faceInfo} />
            ) : (
                <IonContent className={cx('avatar-editor_empty')}>
                    <Typography type={TextType.TITLE_36_48}>Пока что нет созданных аватаров</Typography>
                </IonContent>
            )}
        </div>
    );
};
