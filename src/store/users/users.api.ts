import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';
import { ApiUserEntitySearchItemResponse, SearchApi, SearchParamsDto } from 'generated';

const searchApi = new SearchApi();

export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.BACKEND_URL}/search`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        searchUsers: builder.query<ApiUserEntitySearchItemResponse[], SearchParamsDto>({
            queryFn: async (params: SearchParamsDto) => {
                try {
                    const { data } = await searchApi.searchControllerSearchUsers(params);

                    return { data: data };
                } catch (error) {
                    const { message } = error as AxiosError;

                    return { error: { status: 'CUSTOM_ERROR', data: message, error: message } };
                }
            },
        }),
    }),
});

export const { useLazySearchUsersQuery, useSearchUsersQuery } = usersApi;

export default usersApi.reducer;
