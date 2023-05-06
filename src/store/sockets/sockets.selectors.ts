import { useMemo } from 'react';
import { useConnectQueryState } from 'store/sockets/sockets.api';

export const useSocketsListSelector = () => {
    const raw = useConnectQueryState();

    const chats = useMemo(() => Object.values(raw.data ?? {}), [raw.data]);

    return { chats };
};
