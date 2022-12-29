import React from 'react';
import { Field } from 'react-final-form';

import { CustomToggle } from 'components/CustomToggle';
import { CustomToggleProps } from 'components/CustomToggle/CustomToggle.types';

import { CustomToggleFieldProps } from './CustomToggleField.types';

export const CustomToggleField = <T extends boolean>(props: CustomToggleFieldProps<T>): JSX.Element => (
    <Field<T> {...props} type="checkbox">
        {({ input: { onChange, value: _, ...input }, meta }) => (
            <CustomToggle
                {...(props as CustomToggleProps)}
                {...input}
                onIonChange={onChange}
                hasError={!!meta.error && meta.touched}
                errorMessage={`${meta.error as string}`}
            />
        )}
    </Field>
);
