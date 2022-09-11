import React from 'react';
import cnBind, { Argument } from 'classnames/bind';

import { TextType, Typography } from 'components/Typography';

import { ChatMessageProps } from './ChatMessage.types';

import styles from './ChatMessage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const ChatMessage = ({ message, type = 'outcoming' }: ChatMessageProps) => {
    return (
        <div className={cx('chat-message', type)}>
            <Typography type={TextType.CAPTION_14_24}>{message}</Typography>
        </div>
    );
};
