import { ComponentProps } from 'react';
import { IonInput, IonTextarea } from '@ionic/react';

export type InputType = 'input' | 'textarea';

export type InputFacadeInputProps = Omit<ComponentProps<typeof IonInput>, 'ref' | 'value'> & {
    inputType: 'input';
    value?: string | undefined | null;
    rows?: number;
};

export type InputFacadeTextareaProps = Omit<ComponentProps<typeof IonTextarea>, 'ref'> & {
    inputType: 'textarea';
};

export type InputFacadeProps = Readonly<InputFacadeInputProps | InputFacadeTextareaProps>;

export type CustomInputRef<T extends HTMLIonInputElement | HTMLIonTextareaElement> = T & { clearValue: () => void };
