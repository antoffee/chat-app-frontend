import { ApiFaceInfoEntityResponseGenderEnum } from 'generated';

export type AvatarConstructorProps = {
    params: ColorParamProps[];
    isButtonDisabled?: boolean;
    loading?: boolean;
    onSubmit: () => void;
    gender: ApiFaceInfoEntityResponseGenderEnum;
};

export type ColorParamProps = {
    title: string;
    initialValue?: string;
    name: string;
};
