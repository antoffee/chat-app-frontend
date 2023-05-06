import { useCallback, useMemo } from 'react';
import { useIonModal, UseIonModalResult } from '@ionic/react';
import { useAppSelector } from 'store';
import { getIsMobile } from 'store/windowSize';

import { CreateChatModal } from 'components/CreateChatModal/CreateChatModal';
import { CreateChatModalProps } from 'components/CreateChatModal/CreateChatModal.types';

import styles from './CreateChatModal.module.scss';

export const usePresentChatModal = ({
    isEdit,
    initialValues,
    roomId,
}: Pick<CreateChatModalProps, 'isEdit' | 'initialValues' | 'roomId'>) => {
    const [showCreateChat, closeCreateChat] = useIonModal(CreateChatModal, {
        onDismiss: () => closeCreateChat(),
        isEdit,
        initialValues,
        roomId,
    });
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
