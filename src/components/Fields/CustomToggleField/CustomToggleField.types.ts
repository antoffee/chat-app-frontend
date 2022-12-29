import { CustomFieldProps } from 'types/form';

import { CustomToggleProps } from 'components/CustomToggle/CustomToggle.types';

export type CustomToggleFieldProps<T extends boolean> = CustomFieldProps<CustomToggleProps, T>;
