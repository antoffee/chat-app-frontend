import { ToggleButtonsItemProps } from './ToggleButtonsItem';

export type ToggleButtonItem = Omit<ToggleButtonsItemProps, 'onClick' | 'isActive' | 'hasError'>;

export type ToggleButtonsProps = {
    items: ToggleButtonItem[];
    value?: number | string;
    className?: string;
    onChange?: (id: number | string) => void;
    hasError?: boolean;
};
