import React, { useCallback, useMemo } from 'react';
import { IonButton, IonIcon, isPlatform, useIonRouter } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import * as Icons from 'ionicons/icons';

import { CustomLinkButtonProps } from './CustomLinkButton.types';

import styles from './CustomLinkButton.module.scss';

const _cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const CustomLinkButton: React.FC<CustomLinkButtonProps> = ({ href, back, iconName, children }) => {
    const router = useIonRouter();

    const handleNavClick = useCallback(() => {
        if (href) {

            router.push(href, back ? 'back' : undefined);
        } else if (back) {
            router.goBack()
        }
    }, [back, href, router]);

    const isIos = useMemo(() => isPlatform('ios'), []);

    const icon = useMemo(
        () =>
            (!!iconName && Icons[iconName]) ||
            (back && (isIos ? Icons['chevronBackOutline'] : Icons['arrowBackOutline'])),
        [back, iconName, isIos],
    );

    return (
        <IonButton onClick={handleNavClick}>
            {!!icon && <IonIcon slot="icon-only" icon={icon} />}
            {children}
        </IonButton>
    );
};
