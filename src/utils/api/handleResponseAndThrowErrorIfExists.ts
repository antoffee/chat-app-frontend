import { AxiosError, AxiosResponse } from 'axios';

type ResponceWithError = { error?: string | undefined; statusCode?: number | undefined; message?: string[] };

export const handleResponseAndThrowAnErrorIfExists = (
    resp: Partial<AxiosError<ResponceWithError> | AxiosResponse<ResponceWithError>>,
) => {
    const response =
        (resp as Partial<AxiosError<ResponceWithError>>)?.response ?? (resp as AxiosResponse<ResponceWithError>);
    if (!response) return;
    if (response instanceof Error) {
        throw new Error(response.message);
    }

    if (response.data?.error || response.data?.message) {
        throw new Error(
            Array.isArray(response.data.message) ? response.data.message.join(', ') : response.data.message,
        );
    }
};
