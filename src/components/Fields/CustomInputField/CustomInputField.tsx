import React from 'react';
import { Field } from 'react-final-form';

import { CustomInput, CustomInputProps } from 'components/CustomInput';

import { CustomInputFieldProps } from './CustomInputField.types';

export const CustomInputField = <T extends string>(props: CustomInputFieldProps<T>): JSX.Element => (
    <Field<T> {...props}>
        {({ input: { value, onChange, onBlur, onFocus }, meta }) => (
            <CustomInput
                {...(props as CustomInputProps)}
                value={value}
                onIonChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                hasError={!!meta.error && meta.touched}
                errorMessage={`${meta.error as string}`}
            />
        )}
    </Field>
);
