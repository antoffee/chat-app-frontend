import React, { useMemo } from 'react';
import { IonText } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';

import { DivProps, TypographyProps } from './Typography.types';

import styles from './Typography.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const Typography = (props: TypographyProps) => {
    const { type, as, className } = props;
    const textElement = useMemo(() => {
        switch (as) {
            case 'div':
                return <div {...props} className={cx(type, className)} />;
            case 'p':
                return <p {...props} className={cx(type, className)} />;
            case 'span':
                return <span {...props} className={cx(type, className)} />;
            case 'h1':
                return <h1 {...props} className={cx(type, className)} />;
            case 'h2':
                return <h2 {...props} className={cx(type, className)} />;
            case 'h3':
                return <h3 {...props} className={cx(type, className)} />;
            case 'h4':
                return <h4 {...props} className={cx(type, className)} />;
            case 'h5':
                return <h5 {...props} className={cx(type, className)} />;
            case 'h6':
                return <h6 {...props} className={cx(type, className)} />;
            case 'a':
                return <a {...props} className={cx(type, className)} />;
            default:
                return <div {...(props as DivProps)} className={cx(type, className)} />;
        }
    }, [as, className, props, type]);

    return <IonText className={className}>{textElement}</IonText>;
};
