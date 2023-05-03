import { ApiUserEntityResponse } from 'generated';

export type UserItemProps = {
    user: ApiUserEntityResponse;
    onDelete: (user: ApiUserEntityResponse) => void;
    onUserAvatarClick: (user: ApiUserEntityResponse) => void;
    deletable?: boolean
};
