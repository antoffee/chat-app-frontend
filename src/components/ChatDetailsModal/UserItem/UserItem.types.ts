import { ApiUserEntityWithFaceInfoResponse } from 'generated';

export type UserItemProps = {
    user: ApiUserEntityWithFaceInfoResponse;
    onDelete: (user: ApiUserEntityWithFaceInfoResponse) => void;
    onUserAvatarClick: (user: ApiUserEntityWithFaceInfoResponse) => void;
    deletable?: boolean;
};
