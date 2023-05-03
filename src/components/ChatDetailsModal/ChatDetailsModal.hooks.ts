import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router';
import { useIonModal, UseIonModalResult } from '@ionic/react';
import { useAppSelector } from 'store';
import { getIsMobile } from 'store/windowSize';

import { ChatDetailsModal } from 'components/ChatDetailsModal/ChatDetailsModal';

import styles from './ChatDetailsModal.module.scss';

export const usePresentChatDetailsModal = () => {
    const { id } = useParams<{ id: string }>();
    const [showCreateChat, closeCreateChat] = useIonModal(ChatDetailsModal, { onDismiss: () => closeCreateChat(), id });
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
