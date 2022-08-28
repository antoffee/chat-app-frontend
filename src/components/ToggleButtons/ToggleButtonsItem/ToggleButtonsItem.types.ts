export type ToggleButtonsItemProps = {
    value: number | string;
    label: string;
    isActive: boolean;
    onClick?: (id: number | string) => void;
    hasError?: boolean;
};
