import React from 'react';
import { Field } from 'react-final-form';
import cnBind, { Argument } from 'classnames/bind';

import { Button } from 'components/Button';
import { TextType, Typography } from 'components/Typography';

import { AvatarConstructorProps, ColorParamProps } from './AvatarConstructor.types';

import styles from './AvatarConstructor.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

const ColorParam = ({ title, name, initialValue }: ColorParamProps) => {
    return (
        <div className={cx('color-item')}>
            <Typography type={TextType.CAPTION_16_24}>{title}</Typography>
            <Field component="input" initialValue={initialValue} type="color" name={name} />
        </div>
    );
};

export const AvatarConstructor: React.FC<AvatarConstructorProps> = ({ params, dirty }) => {
    return (
        <div className={cx('avatar-constructor')}>
            {params?.map((param) => (
                <ColorParam key={param.name} {...param} />
            ))}
            <Button disabled={!dirty}>Сохранить изменения</Button>
        </div>
    );
};
