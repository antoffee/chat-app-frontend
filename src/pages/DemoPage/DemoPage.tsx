import React from 'react';
import { IonList } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';

import { ChatItem } from 'components/ChatItem';
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
            <IonList>
                <ChatItem id={0} date={new Date().toISOString()} title="Qwertyuiopp" pinned />
                <ChatItem
                    id={0}
                    unreadCount={23}
                    date={new Date().toISOString()}
                    title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit, ipsum."
                    message="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit, ipsum."
                    image="https://i.pinimg.com/originals/d8/81/d3/d881d3e05c90688581cdeaae1be7edae.jpg"
                />
            </IonList>
        </div>
    );
};
