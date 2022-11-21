import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';
import { ApiChatRoomEntityDetailsResponse, ApiChatRoomEntityResponse, ChatApi } from 'generated';
import { io, Socket } from 'socket.io-client';
import { ChatIncomingEvents } from 'types/chat';

const chatApi = new ChatApi();

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
        getRoomDetails: builder.query<ApiChatRoomEntityDetailsResponse, string>({
            queryFn: async (id: string) => {
                try {
                    const { data } = await chatApi.chatControllerGetRoomDetails(id);

                    return { data: data as unknown as ApiChatRoomEntityDetailsResponse };
                } catch (error) {
                    const { message } = error as AxiosError;

                    return { error: { status: 'CUSTOM_ERROR', data: error, error: message } };
                }
            },
        }),
    }),
});

export const {
    useLazyConnectQuery,
    useGetRoomDetailsQuery,
    endpoints: {
        connect: { useQueryState: useConnectQueryState },
    },
} = socketsApi;

export default socketsApi.reducer;
