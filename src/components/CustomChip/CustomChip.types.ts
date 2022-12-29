import { CustomSelectableValue } from 'types/select';

export type CustomChipProps = {
    value: CustomSelectableValue;
    type?: string;
    hasError?: boolean;
    errorMessage?: string;
    onRemove?: (value: CustomSelectableValue) => void;
};
