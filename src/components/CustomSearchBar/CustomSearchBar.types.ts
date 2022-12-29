import { ReactNode } from 'react';

import { CustomInputProps } from 'components/CustomInput';

export type CustomSearchBarProps<T> = {
    data: T[];
    onSearch?: (searchStr: string) => void;
    getItemElement: (element: T, onSelectFn?: (value: T) => void) => ReactNode;
    loading?: boolean;
} & Omit<Partial<CustomInputProps & { inputType?: 'input' }>, 'data'>;
