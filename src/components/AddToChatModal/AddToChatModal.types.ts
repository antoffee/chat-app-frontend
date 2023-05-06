import { CustomSelectableValue } from 'types/select';

export type AddToChatModalProps = {
    onDismiss?: () => void;
    roomId: number;
};

export type AddToChatValues = {
    members: CustomSelectableValue[];
};

export type AddToChatErrors = Record<keyof AddToChatValues, string | undefined>;
