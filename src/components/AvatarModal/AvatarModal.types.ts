import { ApiFaceInfoEntityResponse } from 'generated';

export type AvatarModalProps = {
    faceInfo?: ApiFaceInfoEntityResponse;
    onDismiss: () => void;
};
