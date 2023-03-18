import { ApiUserEntityResponse } from 'generated';

export type EditSettingsFormProps = { initialValues: EditSettingsFormValues };

export type EditSettingsFormValues = Pick<ApiUserEntityResponse, 'email' | 'name' | 'password' | 'username'>;
export type EditSettingsFormErrors = Record<keyof EditSettingsFormValues, string | undefined>;
