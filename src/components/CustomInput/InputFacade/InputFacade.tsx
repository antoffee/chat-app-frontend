import React, { useImperativeHandle, useRef } from 'react';
import { IonInput, IonTextarea } from '@ionic/react';

import { CustomInputRef, InputFacadeProps } from './InputFacade.types';

export const InputFacade = React.forwardRef<
    CustomInputRef<HTMLIonInputElement | HTMLIonTextareaElement>,
    InputFacadeProps
>((props: InputFacadeProps, ref) => {
    const { inputType } = props;

    const innerRef = useRef<HTMLIonInputElement | HTMLIonTextareaElement | null>(null);

    useImperativeHandle(
        ref,
        () =>
            Object.assign(innerRef.current ?? {}, {
                clearValue: () => {
                    if (innerRef.current?.value) {
                        innerRef.current.value = '';
                    }
                },
            } as CustomInputRef<HTMLIonInputElement | HTMLIonTextareaElement>),
        [],
    );

    switch (inputType) {
        case 'textarea':
            return (
                <IonTextarea
                    {...props}
                    ref={innerRef as React.ForwardedRef<HTMLIonTextareaElement>}
                    rows={props.rows ?? 1}
                    autoGrow
                />
            );
        case 'input':
            return <IonInput {...props} ref={innerRef as React.ForwardedRef<HTMLIonInputElement>} />;
    }
});
