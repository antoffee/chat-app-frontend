import React, { useCallback } from 'react';
import { IonButton } from '@ionic/react';
import cnBind from 'classnames/bind';

import { TextType, Typography } from 'components/Typography';

import { ToggleButtonsItemProps } from './ToggleButtonsItem.types';

import styles from './ToggleButtonsItem.module.scss';

const cx = cnBind.bind(styles);

export const ToggleButtonsItem: React.FC<ToggleButtonsItemProps> = ({ value, label, isActive, onClick, hasError }) => {
    const handleButtonClick = useCallback(() => onClick?.(value), [value, onClick]);

    return (
        <IonButton
            className={cx('button', { 'button-active': isActive, 'button-error': hasError })}
            onClick={handleButtonClick}
        >
            <Typography type={isActive ? TextType.CAPTION_14_24_B : TextType.CAPTION_14_24}>{label}</Typography>
        </IonButton>
    );
};
