export type SignUpValues = {
    username: string;
    password: string;
    name: string;
    email: string;
    gender: 'male' | 'female';
};

export type SignUpErrors = Record<keyof SignUpValues, string | undefined>;

export type SignUpFormProps = {};
