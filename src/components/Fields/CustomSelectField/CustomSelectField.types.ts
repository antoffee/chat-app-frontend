import { CustomFieldProps } from 'types/form';

import { CustomSearchBarProps } from 'components/CustomSearchBar/CustomSearchBar.types';

export type CustomSelectFieldProps<T extends string, D> = CustomFieldProps<CustomSearchBarProps<D>, T>;
