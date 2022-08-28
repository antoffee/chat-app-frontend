import React, { useCallback, useImperativeHandle, useRef } from 'react';
import { IonButton, IonIcon, IonItem, IonLabel, IonNote } from '@ionic/react';
import cnBind from 'classnames/bind';

import { CustomInputRef } from './InputFacade/InputFacade.types';
import { CustomInputProps } from './CustomInput.types';
import { InputFacade } from './InputFacade';

import styles from './CustomInput.module.scss';

const cx = cnBind.bind(styles);

export const CustomInput = React.forwardRef<HTMLIonInputElement | HTMLIonTextareaElement, CustomInputProps>(
    (
        {
            value,
            className,
            disabled,
            label,
            prefixIcon,
            hasError,
            errorMessage,
            readonly,
            placeholder,
            clearButton = false,
            onClearValue,
            onInputWrapperClick,
            children,
            slot,
            ...props
        },
        ref,
    ) => {
        props.inputType ??= 'input';

        const innerRef = useRef<CustomInputRef<HTMLIonInputElement | HTMLIonTextareaElement>>(null);

        useImperativeHandle(ref, () => innerRef.current as HTMLIonInputElement, []);

        const handleClearValue = useCallback(
            (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
                onClearValue?.(e);
                innerRef.current?.clearValue();
            },
            [onClearValue],
        );

        return (
            <div className={cx('container')} slot={slot}>
                <IonItem
                    mode="md"
                    fill="solid"
                    onClick={onInputWrapperClick}
                    className={cx('input-wrapper', 'ion-item-input-wrapper-custom', {
                        'input-wrapper-clickable': onInputWrapperClick,
                        'input-with-error': hasError,
                    })}
                >
                    {label && <IonLabel position="floating">{label}</IonLabel>}
                    <InputFacade
                        ref={innerRef}
                        className={cx('input', className)}
                        value={value}
                        disabled={disabled}
                        readonly={readonly}
                        placeholder={placeholder}
                        {...props}
                    >
                        {prefixIcon && <IonIcon className={cx('prefix-icon')} icon={prefixIcon} />}
                        {!!value && clearButton && (
                            <IonButton
                                size="small"
                                fill="clear"
                                className={cx('clear-button', props.inputType)}
                                disabled={disabled}
                                onClick={handleClearValue}
                            >
                                <IonIcon icon="close" slot="icon-only" />
                            </IonButton>
                        )}
                    </InputFacade>
                </IonItem>
                {hasError && (
                    <IonNote color="danger" slot="error">
                        {errorMessage}
                    </IonNote>
                )}
                {children}
            </div>
        );
    },
);
