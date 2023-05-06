import { useCallback, useMemo } from 'react';
import { useIonModal, UseIonModalResult } from '@ionic/react';
import { useAppSelector } from 'store';
import { getIsMobile } from 'store/windowSize';

import { AddToChatModal } from 'components/AddToChatModal/AddToChatModal';
import { AddToChatModalProps } from 'components/AddToChatModal/AddToChatModal.types';

import styles from './AddToChatModal.module.scss';

export const usePresentAddToChatModal = ({ roomId }: Omit<AddToChatModalProps, 'onDismiss'>) => {
    const [showAddToChat, closeAddToChat] = useIonModal(AddToChatModal, { onDismiss: () => closeAddToChat(), roomId });
    const isMobile = useAppSelector(getIsMobile);

    const responsiveProps = useMemo(() => (isMobile ? { breakpoints: [0, 1], initialBreakpoint: 1 } : {}), [isMobile]);

    const showModal = useCallback(
        (options?: UseIonModalResult[0]) => {
            showAddToChat({ ...(options ?? {}), ...responsiveProps, cssClass: styles['add-to-chat-modal'] });
        },
        [responsiveProps, showAddToChat],
    );

    return { showAddToChat: showModal, closeCreateChat: closeAddToChat };
};
