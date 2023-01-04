import { useCallback, useMemo } from 'react';
import { useIonModal, UseIonModalResult } from '@ionic/react';
import { useAppSelector } from 'store';
import { getIsMobile } from 'store/windowSize';

import { CreateChatModal } from 'components/CreateChatModal/CreateChatModal';

import styles from './CreateChatModal.module.scss';

export const usePresentChatModal = () => {
    const [showCreateChat, closeCreateChat] = useIonModal(CreateChatModal, { onDismiss: () => closeCreateChat() });
    const isMobile = useAppSelector(getIsMobile);

    const responsiveProps = useMemo(() => (isMobile ? { breakpoints: [0, 1], initialBreakpoint: 1 } : {}), [isMobile]);

    const showModal = useCallback(
        (options?: UseIonModalResult[0]) => {
            showCreateChat({ ...(options ?? {}), ...responsiveProps, cssClass: styles['create-chat-modal'] });
        },
        [responsiveProps, showCreateChat],
    );

    return { showCreateChat: showModal, closeCreateChat };
};
