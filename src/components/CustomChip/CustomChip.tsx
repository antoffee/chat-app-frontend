import React, { useCallback } from 'react';
import { IonChip, IonIcon } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { closeCircle } from 'ionicons/icons';

import { TextType, Typography } from 'components/Typography';

import { CustomChipProps } from './CustomChip.types';

import styles from './CustomChip.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const CustomChip: React.FC<CustomChipProps> = ({ value, type, onRemove, hasError }) => {
    const handleRemove = useCallback(() => {
        onRemove?.(value);
    }, [onRemove, value]);

    return (
        <IonChip className={cx('chip', { error: hasError })}>
            <input value={value?.id} type={type} />
            <Typography type={TextType.CAPTION_14_24}>{value?.label}</Typography>
            <IonIcon onClick={handleRemove} icon={closeCircle} />
        </IonChip>
    );
};
