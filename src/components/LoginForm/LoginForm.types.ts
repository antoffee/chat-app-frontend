export type LoginValues = {
    username: string;
    password: string;
};

export type LoginErrors = Record<keyof LoginValues, string | undefined>;
