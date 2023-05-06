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
    UpdateChatRoomDto,
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
        connect: builder.query<Record<string, ApiChatRoomEntityWithMembersResponse>, void>({
            queryFn: () => ({ data: {} }),
            async onCacheEntryAdded(_, { cacheDataLoaded, updateCachedData, cacheEntryRemoved, dispatch, getState }) {
                try {
                    await cacheDataLoaded;

                    const state = getState() as AppState;

                    const socket = getSocket();

                    socket?.on(
                        ChatIncomingEvents.CLIENT_CONNECTED,
                        ({ rooms }: { rooms: ApiChatRoomEntityWithMembersResponse[] }) => {
                            updateCachedData((draft) => {
                                rooms.forEach((room) => {
                                    draft[room.id] = {
                                        ...room,
                                        name:
                                            room.name ??
                                            room.members?.find((item) => item.id !== state.auth.user?.id)?.name,
                                    };
                                });
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
                            updateCachedData((draft) => {
                                const item = draft[message.chatRoomEntityId];
                                draft[message.chatRoomEntityId] = { ...item, messages: [message] };
                            });
                        }
                    };

                    const updateData = (data: ApiChatRoomEntityWithMembersResponse) => {
                        dispatch(
                            socketsApi.util.updateQueryData('connect', undefined, (draft) => {
                                draft[data.id] = {
                                    ...data,
                                    name:
                                        data.name ??
                                        data.members?.find((item) => item.id !== state.auth.user?.id)?.name,
                                };
                            }),
                        );
                    };

                    socket?.on(ChatIncomingEvents.SEND_MESSAGE_TO_CLIENT, patchResult);

                    socket?.on(ChatIncomingEvents.CLIENT_JOINED_ROOM, updateData);
                    socket?.on(ChatIncomingEvents.NEW_ROOM_CREATED, updateData);
                    socket?.on(ChatIncomingEvents.MEMBER_EXCLUDED_FROM_GROUP_ROOM, updateData);
                    socket?.on(ChatIncomingEvents.NEW_MEMBER_ADDED_TO_GROUP_ROOM, updateData);
                    socket?.on(ChatIncomingEvents.ROOM_ENTITY_UPDATED, (data: ApiChatRoomEntityDetailsResponse) => {
                        dispatch(
                            socketsApi.util.updateQueryData('connect', undefined, (draft) => {
                                draft[data.id] = {
                                    ...draft[data.id],
                                    ...data,
                                } as unknown as ApiChatRoomEntityWithMembersResponse;
                            }),
                        );
                    });

                    socket?.on(ChatIncomingEvents.CLIENT_LEAVED_ROOM, (data: ApiChatRoomEntityWithMembersResponse) => {
                        dispatch(
                            socketsApi.util.updateQueryData('connect', undefined, (draft) => {
                                if (Object.keys(draft).includes(`${data.id}`)) {
                                    delete draft[data.id];
                                }
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
            queryFn: ({ isPrivate, members, ...room }: CreateChatValues) => {
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

                return { data: undefined };
            },
        }),
        updateRoom: builder.mutation<undefined, UpdateChatRoomDto>({
            queryFn: ({ name, description, roomId }: UpdateChatRoomDto) => {
                const socket = getSocket();

                socket.emit(ChatOutgoingEvents.UPDATE_ROOM_ENTITY, {
                    name,
                    description,
                    roomId,
                });

                return { data: undefined };
            },
        }),
        leaveRoom: builder.mutation<
            undefined,
            Pick<JoinLeaveGroupChatRoomDto, 'roomId'> & {
                isPrivate?: boolean;
                userId?: JoinLeaveGroupChatRoomDto['userId'];
            }
        >({
            queryFn: (payload, { getState }) => {
                const socket = getSocket();

                const state = getState() as AppState;

                const event = payload.isPrivate
                    ? ChatOutgoingEvents.CLIENT_LEAVE_PRIVATE_ROOM
                    : ChatOutgoingEvents.CLIENT_LEAVE_GROUP_ROOM;

                socket.emit(event, {
                    userId: payload.userId ?? state.auth.user?.id,
                    roomId: payload.roomId,
                } as JoinLeaveGroupChatRoomDto);

                return { data: undefined };
            },
        }),
        addToGroupRoom: builder.mutation<undefined, JoinLeaveGroupChatRoomDto[]>({
            queryFn: (payload) => {
                const socket = getSocket();

                const users = payload;

                users.forEach((user) => {
                    socket.emit(ChatOutgoingEvents.CLIENT_JOIN_GROUP_ROOM, {
                        userId: user.userId,
                        roomId: user.roomId,
                    } as JoinLeaveGroupChatRoomDto);
                });

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
    useUpdateRoomMutation,
    useLeaveRoomMutation,
    useAddToGroupRoomMutation,
    endpoints: {
        connect: { useQueryState: useConnectQueryState },
        getRoomDetails: { useQueryState: useRoomDetailsState },
    },
} = socketsApi;

export default socketsApi.reducer;
