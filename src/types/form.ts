import { FieldInputProps, UseFieldConfig } from 'react-final-form';

export type FieldProps<T> = Partial<
    Pick<
        FieldInputProps<T>,
        'onBlur' | 'onChange' | 'onFocus' | 'type' | 'value' | 'checked' | 'multiple' | 'defaultValue'
    >
>;

export type CustomFieldProps<P, T extends string | number | unknown[] = string> = Omit<P, keyof FieldProps<T>> &
    Omit<FieldProps<T>, 'children'> & {
        name: string;
    } & UseFieldConfig<T>;
