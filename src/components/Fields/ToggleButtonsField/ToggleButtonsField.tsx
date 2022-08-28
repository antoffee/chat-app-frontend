import React from 'react';
import { Field } from 'react-final-form';

import { ToggleButtons } from 'components/ToggleButtons';

import { ToggleButtonsFieldProps } from './ToggleButtonsField.types';

export const ToggleButtonsField = (props: ToggleButtonsFieldProps): JSX.Element => (
    <Field<string | number> {...props}>
        {({ input: { value, onChange }, meta }) => (
            <ToggleButtons {...props} value={value} onChange={onChange} hasError={!!meta.error && meta.touched} />
        )}
    </Field>
);
