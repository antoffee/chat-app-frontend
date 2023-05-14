import { useCallback, useMemo } from 'react';
import { useIonModal, UseIonModalResult } from '@ionic/react';
import { useAppSelector } from 'store';
import { getIsMobile } from 'store/windowSize';

import { AvatarModal } from 'components/AvatarModal/AvatarModal';
import { AvatarModalProps } from 'components/AvatarModal/AvatarModal.types';
import { noop } from 'utils';

import styles from './AvatarModal.module.scss';

export const usePresentAvatarModal = ({ faceInfo }: Pick<AvatarModalProps, 'faceInfo'>) => {
    const [showCreateChat, closeCreateChat] = useIonModal(AvatarModal, {
        onDismiss: () => closeCreateChat(),
        faceInfo,
    });
    const isMobile = useAppSelector(getIsMobile);

    const responsiveProps = useMemo(() => (isMobile ? { breakpoints: [0, 1], initialBreakpoint: 1 } : {}), [isMobile]);

    const showModal = useCallback(
        (options?: UseIonModalResult[0]) => {
            showCreateChat({ ...(options ?? {}), ...responsiveProps, cssClass: styles['create-chat-modal'] });
        },
        [responsiveProps, showCreateChat],
    );

    return { showAvatar: faceInfo ? showModal : noop, closeCreateChat };
};
