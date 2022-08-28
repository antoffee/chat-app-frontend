import React from 'react';
import cnBind, { Argument } from 'classnames/bind';

import { FlipCardLayoutProps } from './FlipCardLayout.types';

import styles from './FlipCardLayout.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const FlipCardLayout = ({ children, contentDimensions, isRotated, direction }: FlipCardLayoutProps) => {
    const [frontSide, backSide] = children ?? [];

    return (
        <div style={contentDimensions} className={cx('flip-card', direction, { rotated: isRotated })}>
            <div className={cx('flip-card-inner')}>
                <div className={cx('flip-card-front')}>{frontSide}</div>
                <div className={cx('flip-card-back')}>{backSide}</div>
            </div>
        </div>
    );
};
