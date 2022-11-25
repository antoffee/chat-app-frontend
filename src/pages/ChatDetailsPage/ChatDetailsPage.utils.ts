import { FORM_ERROR } from 'final-form';
import { SendMessageValues } from 'pages/ChatDetailsPage/ChatDetailsPage.types';

export const validateSendMessage = (values: SendMessageValues) => ({
    [FORM_ERROR]: values?.content?.trim() ? undefined : true,
});
