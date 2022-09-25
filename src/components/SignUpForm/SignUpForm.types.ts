export type SignUpValues = {
    username: string;
    password: string;
    name: string;
    email: string;
};

export type SignUpErrors = Record<keyof SignUpValues, string | undefined>;

export type SignUpFormProps = {
    onComplete?: () => void;
};
