import React from 'react';
import { Field } from 'react-final-form';
import { CustomSelectableValue } from 'types/select';

import { CustomChip, CustomChipProps } from 'components/CustomChip';

import { CustomChipFieldProps } from './CustomChipField.types';

export const CustomChipField = (props: CustomChipFieldProps): JSX.Element => (
    <Field<CustomSelectableValue> {...props}>
        {({ input, meta }) => (
            <CustomChip
                {...(props as CustomChipProps)}
                {...input}
                hasError={!!meta.error && meta.touched}
                errorMessage={`${meta.error as string}`}
            />
        )}
    </Field>
);
