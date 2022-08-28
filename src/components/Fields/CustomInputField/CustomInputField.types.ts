import { CustomFieldProps } from "types/form";

import { CustomInputProps } from "components/CustomInput";

export type CustomInputFieldProps<T extends string> = CustomFieldProps<
CustomInputProps,
T
>;
