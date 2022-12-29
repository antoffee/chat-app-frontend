import React from 'react';
import { Field } from 'react-final-form';

import { CustomSearchBar } from 'components/CustomSearchBar';
import { CustomSearchBarProps } from 'components/CustomSearchBar/CustomSearchBar.types';

import { CustomSelectFieldProps } from './CustomSelectField.types';

export const CustomSelectField = <T extends string, DataType>(
    props: CustomSelectFieldProps<T, DataType>,
): JSX.Element => (
    <Field<T> {...props}>
        {({ input: { type: _, ...input }, meta }) => (
            <CustomSearchBar
                {...(props as CustomSearchBarProps<DataType>)}
                {...(input as unknown as CustomSearchBarProps<DataType>)}
                hasError={!!meta.error && meta.touched}
                errorMessage={`${meta.error as string}`}
            />
        )}
    </Field>
);
