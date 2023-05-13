export type AvatarConstructorProps = {
    params: ColorParamProps[];
    dirty?: boolean;
    onSubmit: () => void;
};

export type ColorParamProps = {
    title: string;
    initialValue?: string;
    name: string;
};
