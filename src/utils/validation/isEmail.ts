const EMAIL_REGEX = /(^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$)/;

export const isEmail = (str?: string) => EMAIL_REGEX.test(str ?? '');
