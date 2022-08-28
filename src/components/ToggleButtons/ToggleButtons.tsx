import React from 'react';
import cnBind from 'classnames/bind';

import { ToggleButtonsProps } from './ToggleButtons.types';
import { ToggleButtonsItem } from './ToggleButtonsItem';

import styles from './ToggleButtons.module.scss';

const cx = cnBind.bind(styles);

export const ToggleButtons: React.FC<ToggleButtonsProps> = ({
    items,
    hasError,
    value: activeItemId,
    className,
    onChange: onActiveItemChange,
}) => {
    return (
        <div className={cx('container', className)}>
            {items.map((item) => (
                <ToggleButtonsItem
                    hasError={hasError}
                    key={item.value}
                    isActive={activeItemId === item.value}
                    onClick={onActiveItemChange}
                    {...item}
                />
            ))}
        </div>
    );
};
