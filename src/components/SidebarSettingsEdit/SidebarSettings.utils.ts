import { axiosInstance } from 'api/axios';
import { AxiosResponse } from 'axios';
import { FaceAnalyzeApi, ScheduleAnalyzeJobResponse } from 'generated';
import { createFileFromBase64, FileInput } from 'store/auth';

import { EditSettingsValues } from 'components/SidebarSettingsEdit/SidebarSettingsEdit.types';
import { isEmail } from 'utils';

import { INVALID_FORMAT_ERROR, REQUIRED_FILD_ERROR } from '~constants';

const faceApi = new FaceAnalyzeApi();

export const validateEdit = (values: EditSettingsValues) => {
    return {
        name: values.name?.trim() ? undefined : REQUIRED_FILD_ERROR,
        username: values.username?.trim() ? undefined : REQUIRED_FILD_ERROR,
        email: values.email ? (!isEmail(values.email) ? INVALID_FORMAT_ERROR : undefined) : undefined,
    };
};

export const scheduleFaceAnalize = async (input: FileInput) => {
    const file = await createFileFromBase64(input);
    const data = new FormData();
    data.set('file', file);
    const fileResponse = await axiosInstance.post<FormData, AxiosResponse<ScheduleAnalyzeJobResponse>>(
        '/chat-api/face-analyze/schedule',
        data,
        {
            headers: { 'Content-Length': file.size },
        },
    );

    return fileResponse.data;
};

export const checkFaceAnalizeStatus = (jobId: string) =>
    faceApi.faceControllerCheckAnalyzeJobStatus(jobId).then((resp) => resp.data);
