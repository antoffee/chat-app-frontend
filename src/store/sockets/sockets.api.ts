import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { socketService } from 'api/socketService';
import { AxiosError } from 'axios';
import {
    ApiChatMessageEntityDetailsResponse,
    ApiChatRoomEntityDetailsResponse,
    ApiChatRoomEntityWithMembersResponse,
    ChatApi,
    CreateGroupChatRoomDto,
    CreatePrivateChatRoomDto,
    JoinLeaveGroupChatRoomDto,
} from 'generated';
import { AppState } from 'store';
import { ChatIncomingEvents, ChatOutgoingEvents } from 'types/chat';

import { CreateChatValues } from 'components/CreateChatModal/CreateChatModal.types';

const chatApi = new ChatApi();

type SendMessage = {
    content: string;
    roomId: number;
};

function getSocket() {
    return socketService.socket;
}

export const socketsApi = createApi({
    reducerPath: 'sockets',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.BACKEND_URL}`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        connect: builder.query<ApiChatRoomEntityWithMembersResponse[], void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(_, { cacheDataLoaded, updateCachedData, cacheEntryRemoved, dispatch, getState }) {
                try {
                    await cacheDataLoaded;

                    const state = getState() as AppState;

                    const socket = getSocket();

                    socket?.on(
                        ChatIncomingEvents.CLIENT_CONNECTED,
                        ({ rooms }: { rooms: ApiChatRoomEntityWithMembersResponse[] }) => {
                            updateCachedData((draft) => {
                                draft.push(
                                    ...rooms.map((room) => ({
                                        ...room,
                                        name:
                                            room.name ??
                                            room.members?.find((item) => item.id !== state.auth.user?.id)?.name,
                                    })),
                                );
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

                    socket?.on(ChatIncomingEvents.CLIENT_JOINED_ROOM, (data: ApiChatRoomEntityWithMembersResponse) => {
                        dispatch(
                            socketsApi.util.updateQueryData('connect', undefined, (draft) => {
                                if (draft.some((room) => room.id === data.id)) {
                                    return;
                                }
                                draft.push(data);
                            }),
                        );
                    });

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
            queryFn: ({ isPrivate, members, ...room }: CreateChatValues, { dispatch }) => {
                const socket = getSocket();

                if (!isPrivate) {
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

                socket?.on(ChatIncomingEvents.NEW_ROOM_CREATED, (data: ApiChatRoomEntityWithMembersResponse) => {
                    dispatch(
                        socketsApi.util.updateQueryData('connect', undefined, (draft) => {
                            if (draft.some((room) => room.id === data.id)) {
                                return;
                            }
                            draft.push(data);
                        }),
                    );
                });

                return { data: undefined };
            },
        }),
        leaveRoom: builder.mutation<undefined, Pick<JoinLeaveGroupChatRoomDto, 'roomId'>>({
            queryFn: (payload, { dispatch, getState }) => {
                const socket = getSocket();

                const state = getState() as AppState;

                socket.emit(ChatOutgoingEvents.CLIENT_LEAVE_GROUP_ROOM, {
                    userId: state.auth.user?.id,
                    roomId: payload.roomId,
                } as JoinLeaveGroupChatRoomDto);

                dispatch(
                    socketsApi.util.updateQueryData('connect', undefined, (draft) => {
                        return draft?.filter((room) => room.id !== payload.roomId);
                    }),
                );

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
    useLeaveRoomMutation,
    endpoints: {
        connect: { useQueryState: useConnectQueryState },
    },
} = socketsApi;

export default socketsApi.reducer;
