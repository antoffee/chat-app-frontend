import { useCallback } from 'react';
import { useIonModal, UseIonModalResult, useIonPopover, UseIonPopoverResult, useIonRouter } from '@ionic/react';
import { appRoutes } from 'routes';

import { UserOptionsModal } from 'components/UserOptionsModal/UserOptionsModal';

export const useUserOptionsModal = () => {
    const router = useIonRouter();

    const onSettingsClick = useCallback(() => {
        router.push(appRoutes.settings());
    }, [router]);

    const [showUserOptions, closeUserOptions] = useIonModal(UserOptionsModal, {
        onDismiss: () => closeUserOptions(),
        onSettingsClick,
    });

    const showModal: UseIonModalResult[0] = useCallback(
        (options) => {
            showUserOptions({ ...(options ?? {}), breakpoints: [0, 0.25, 0.5, 1], initialBreakpoint: 0.25 });
        },
        [showUserOptions],
    );

    return { showUserOptions: showModal, closeUserOptions };
};

export const useUserOptionsPopover = () => {
    const router = useIonRouter();

    const onSettingsClick = useCallback(() => {
        router.push(appRoutes.settings());
    }, [router]);

    const [showUserOptions, closeUserOptions] = useIonPopover(UserOptionsModal, {
        onDismiss: () => closeUserOptions(),
        onSettingsClick,
    });

    const showModal: UseIonPopoverResult[0] = useCallback(
        (options?) => {
            showUserOptions({ ...(options ?? {}), dismissOnSelect: true });
        },
        [showUserOptions],
    );

    return { showUserOptions: showModal, closeUserOptions };
};
