import React from 'react';
import cnBind, { Argument } from 'classnames/bind';

import { ChatMessage } from 'components/ChatMessage';

import styles from './DemoPage.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const DemoPage = () => {
    return (
        <div className={cx('demo-page')}>
            <ChatMessage
                type="incoming"
                message="Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed and built by Ionic."
            />
            <ChatMessage
                type="outcoming"
                message="Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed and built by Ionic."
            />
        </div>
    );
};
