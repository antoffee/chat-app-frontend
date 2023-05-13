export type AvatarConstructorProps = {
    params: ColorParamProps[];
    dirty?: boolean;
};

export type ColorParamProps = {
    title: string;
    initialValue?: string;
    name: string;
};
