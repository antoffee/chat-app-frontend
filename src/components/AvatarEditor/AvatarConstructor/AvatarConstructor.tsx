import React, { useCallback, useState } from 'react';
import { Field } from 'react-final-form';
import { IonIcon, IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import { ApiFaceInfoEntityResponseGenderEnum } from 'generated';
import { caretDownOutline, caretUpOutline } from 'ionicons/icons';
import { useAppSelector } from 'store';
import { getIsMobile } from 'store/windowSize';

import { Button } from 'components/Button';
import { TextType, Typography } from 'components/Typography';

import { AvatarConstructorProps, ColorParamProps } from './AvatarConstructor.types';

import styles from './AvatarConstructor.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

const ColorParam = ({ title, name, initialValue }: ColorParamProps) => {
    return (
        <div className={cx('color-item')}>
            <Typography type={TextType.CAPTION_16_24}>{title}</Typography>
            <Field component="input" initialValue={initialValue} type="color" name={name} />
        </div>
    );
};

export const AvatarConstructor: React.FC<AvatarConstructorProps> = ({
    params,
    isButtonDisabled,
    onSubmit,
    loading,
    gender,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const onExpand = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    const isMobile = useAppSelector(getIsMobile);

    return (
        <div className={cx('avatar-constructor', { expanded: isExpanded || !isMobile })}>
            {(isExpanded || !isMobile) && (
                <>
                    {params?.map((param) => (
                        <ColorParam key={param.name} {...param} />
                    ))}
                    <Field name={'gender'} initialValue={gender}>
                        {({ input }) => (
                            <IonRadioGroup {...input}>
                                <Typography type={TextType.CAPTION_16_24}>Пол</Typography>
                                <IonItem onClick={() => input.onChange(ApiFaceInfoEntityResponseGenderEnum.MALE)}>
                                    <IonLabel>Мужской</IonLabel>
                                    <IonRadio value={ApiFaceInfoEntityResponseGenderEnum.MALE} />
                                </IonItem>
                                <IonItem onClick={() => input.onChange(ApiFaceInfoEntityResponseGenderEnum.FEMALE)}>
                                    <IonLabel>Женский</IonLabel>
                                    <IonRadio value={ApiFaceInfoEntityResponseGenderEnum.FEMALE} />
                                </IonItem>
                            </IonRadioGroup>
                        )}
                    </Field>

                    <Button onClick={onSubmit} loading={loading} disabled={isButtonDisabled}>
                        Сохранить изменения
                    </Button>
                </>
            )}
            {!isExpanded && isMobile && (
                <div onClick={onExpand} className={cx('avatar-constructor_open')}>
                    <IonIcon icon={caretDownOutline} color="primary" />
                </div>
            )}
            {isMobile && isExpanded && (
                <div onClick={onExpand} className={cx('avatar-constructor_close')}>
                    <IonIcon icon={caretUpOutline} color="primary" />
                </div>
            )}
        </div>
    );
};
