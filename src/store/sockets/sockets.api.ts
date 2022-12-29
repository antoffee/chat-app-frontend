import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';
import {
    ApiChatMessageEntityDetailsResponse,
    ApiChatRoomEntityDetailsResponse,
    ApiChatRoomEntityResponse,
    ChatApi,
    CreateGroupChatRoomDto,
    CreatePrivateChatRoomDto,
} from 'generated';
import { io, Socket } from 'socket.io-client';
import { ChatIncomingEvents, ChatOutgoingEvents } from 'types/chat';

import { CreateChatValues } from 'components/CreateChatModal/CreateChatModal.types';

const chatApi = new ChatApi();

type SendMessage = {
    content: string;
    roomId: number;
};

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
            async onCacheEntryAdded(_, { cacheDataLoaded, updateCachedData, cacheEntryRemoved, dispatch }) {
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

                    const patchResult = (message: ApiChatMessageEntityDetailsResponse) => {
                        {
                            dispatch(
                                socketsApi.util.updateQueryData(
                                    'getRoomDetails',
                                    `${message.chatRoomEntityId}`,
                                    (draft) => {
                                        draft.messages.push(message);
                                    },
                                ),
                            );
                            updateCachedData((draft) =>
                                draft.map((item) =>
                                    item.id === message.chatRoomEntityId ? { ...item, messages: [message] } : item,
                                ),
                            );
                        }
                    };

                    socket?.on(ChatIncomingEvents.SEND_MESSAGE_TO_CLIENT, patchResult);

                    socket?.on('exception', (err) => console.error(err));

                    await cacheEntryRemoved;
                    socket?.off(ChatIncomingEvents.CLIENT_CONNECTED);
                } catch (e) {
                    console.error(e);
                }
            },
        }),

        sendMessage: builder.mutation<undefined, SendMessage>({
            queryFn: (chatMessageContent: SendMessage) => {
                const socket = getSocket();

                socket.emit(ChatOutgoingEvents.SEND_MESSAGE_TO_SERVER, chatMessageContent);

                return { data: undefined };
            },
        }),
        createRoom: builder.mutation<undefined, CreateChatValues>({
            queryFn: ({ members, ...room }: CreateChatValues) => {
                const socket = getSocket();

                if (members?.length > 1) {
                    socket.emit(ChatOutgoingEvents.NEW_GROUP_ROOM_CREATE, {
                        ...room,
                        members: members.map((el) => el.id),
                    } as CreateGroupChatRoomDto);
                } else {
                    socket.emit(ChatOutgoingEvents.NEW_PRIVATE_ROOM_CREATE, {
                        ...room,
                        secondMemberId: members?.[0]?.id,
                    } as CreatePrivateChatRoomDto);
                }

                return { data: undefined };
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
    useSendMessageMutation,
    useCreateRoomMutation,
    endpoints: {
        connect: { useQueryState: useConnectQueryState },
    },
} = socketsApi;

export default socketsApi.reducer;
