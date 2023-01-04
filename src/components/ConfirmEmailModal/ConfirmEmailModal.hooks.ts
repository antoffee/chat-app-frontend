import { useCallback, useMemo } from 'react';
import { useIonModal, UseIonModalResult } from '@ionic/react';
import { useAppSelector } from 'store';
import { getIsMobile } from 'store/windowSize';

import { ConfirmEmailModal } from 'components/ConfirmEmailModal/ConfirmEmailModal';

import styles from './ConfirmEmailModal.module.scss';

export const useConfirmEmailModal = () => {
    const [showConfirmEmail, closeConfirmEmail] = useIonModal(ConfirmEmailModal, {
        onDismiss: () => closeConfirmEmail(),
    });
    const isMobile = useAppSelector(getIsMobile);

    const responsiveProps = useMemo(() => (isMobile ? { breakpoints: [0, 1], initialBreakpoint: 1 } : {}), [isMobile]);

    const showModal: UseIonModalResult[0] = useCallback(
        (options) => {
            showConfirmEmail({ ...(options ?? {}), ...responsiveProps, cssClass: styles['confirm-email'] });
        },
        [responsiveProps, showConfirmEmail],
    );

    return { showConfirmEmail: showModal, closeConfirmEmail };
};
