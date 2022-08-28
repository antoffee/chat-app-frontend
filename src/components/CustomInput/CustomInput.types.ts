import React from 'react';

import { InputFacadeInputProps, InputFacadeProps, InputFacadeTextareaProps } from './InputFacade/InputFacade.types';

export type CustomInputAdditionalProps = {
    label?: string;
    icon?: string;
    iconLeft?: boolean;
    prefix?: string;
    prefixIcon?: string;
    hasError?: boolean;
    errorMessage?: string;
    clearButton?: boolean;
    onInputWrapperClick?: (event: React.MouseEvent) => void;
    onClearValue?: (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => void;
};

export type CustomInputProps = InputFacadeProps & CustomInputAdditionalProps;

export type DirectCustomInputProps<T extends 'input' | 'textarea'> = T extends 'input'
    ? InputFacadeInputProps & CustomInputAdditionalProps
    : InputFacadeTextareaProps & CustomInputAdditionalProps;
