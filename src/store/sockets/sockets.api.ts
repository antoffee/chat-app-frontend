import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiChatRoomEntityResponse } from 'generated';
import { io, Socket } from 'socket.io-client';
import { ChatIncomingEvents } from 'types/chat';

let socket: Socket;
function getSocket() {
    if (!socket) {
        socket = io(`${process.env.BACKEND_URL}/chat`, {
            withCredentials: true,
        });
    }

    return socket;
}

export const socketsApi = createApi({
    reducerPath: 'sockets',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.BACKEND_URL}`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        connect: builder.query<ApiChatRoomEntityResponse[], void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(_, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
                try {
                    await cacheDataLoaded;

                    const socket = getSocket();

                    socket?.on(
                        ChatIncomingEvents.CLIENT_CONNECTED,
                        ({ rooms }: { rooms: ApiChatRoomEntityResponse[] }) => {
                            updateCachedData((draft) => {
                                draft.push(...rooms);
                            });
                        },
                    );

                    await cacheEntryRemoved;
                    socket?.off(ChatIncomingEvents.CLIENT_CONNECTED);
                } catch (e) {
                    console.error(e);
                }
            },
        }),
    }),
});

export const {
    useLazyConnectQuery,
    endpoints: {
        connect: { useQueryState: useConnectQueryState },
    },
} = socketsApi;

export default socketsApi.reducer;
