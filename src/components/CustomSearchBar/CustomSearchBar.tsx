import React, { useCallback, useState } from 'react';
import { InputChangeEventDetail, IonList } from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';

import { CustomInput } from 'components/CustomInput';

import { CustomSearchBarProps } from './CustomSearchBar.types';

import styles from './CustomSearchBar.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const CustomSearchBar = <T,>({
    data,
    getItemElement,
    onSearch,
    inputType = 'input',
    ...props
}: CustomSearchBarProps<T>) => {
    const [inputValue, setInputValue] = useState('');

    const handleSearch = useCallback(
        (e: CustomEvent<InputChangeEventDetail>) => {
            const value = (e.target as HTMLIonInputElement)?.value;
            setInputValue(`${value ?? ''}`);
            onSearch?.(`${value ?? ''}`);
        },
        [onSearch],
    );

    return (
        <CustomInput
            {...props}
            inputType={inputType}
            className={cx('searchbar')}
            onIonChange={handleSearch}
            value={inputValue}
        >
            {!!data?.length && (
                <IonList className={cx('searchbar__list')}>{data?.map((el) => getItemElement(el))}</IonList>
            )}
        </CustomInput>
    );
};
