import { ApiUserEntityWithFaceInfoResponse, JoinLeaveGroupChatRoomDto } from 'generated';

export type ChatItemProps = {
    title?: string;
    date?: string | Date;
    image?: string;
    unreadCount?: number;
    messageState?: 'sent' | 'error' | 'read';
    pinned?: boolean;
    message?: string;
    id: number;
    isPrivate?: boolean;
    members?: ApiUserEntityWithFaceInfoResponse[];
    userId: number;
    onMakeRead?: () => void;
    onDelete?: (data: Pick<JoinLeaveGroupChatRoomDto, 'roomId'> & { isPrivate?: boolean }) => void;
};
