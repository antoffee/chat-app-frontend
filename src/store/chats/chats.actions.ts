import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatApi } from 'generated';

const chatApi = new ChatApi();

export const getChatList = createAsyncThunk('CHATS/GET_LIST', async () => await chatApi.chatControllerGetSelfRooms());
