import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import arrayMutators from 'final-form-arrays';
import { checkmark, close } from 'ionicons/icons';
import debounce from 'lodash.debounce';
import { useCreateRoomMutation, useUpdateRoomMutation } from 'store/sockets';
import { useLazySearchUsersQuery } from 'store/users';
import { CustomSelectableValue } from 'types/select';

import { validateCreateChat, validateEditChat } from 'components/CreateChatModal/CreateChatModal.utils';
import { CustomSearchBar } from 'components/CustomSearchBar';
import { CustomChipField } from 'components/Fields/CustomChipField';
import { CustomInputField } from 'components/Fields/CustomInputField';
import { CustomToggleField } from 'components/Fields/CustomToggleField';
import { TextType, Typography } from 'components/Typography';

import { CreateChatModalProps, CreateChatValues } from './CreateChatModal.types';

import styles from './CreateChatModal.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const CreateChatModal: React.FC<CreateChatModalProps> = ({ onDismiss, isEdit, initialValues, roomId }) => {
    const [searchUsers, { isLoading, data }] = useLazySearchUsersQuery();
    const [createRoom] = useCreateRoomMutation();
    const [updateRoom] = useUpdateRoomMutation();

    const handleSearch = useMemo(
        () =>
            debounce(async (searchString: string) => {
                if (searchString?.length > 2) {
                    await searchUsers({ searchString });
                }
            }, 100),
        [searchUsers],
    );

    const handleSubmit = useCallback(
        async (values: CreateChatValues) => {
            if (isEdit) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                await updateRoom({ ...values, roomId: roomId! });
            }
            await createRoom(values);
            onDismiss?.();
        },
        [createRoom, isEdit, onDismiss, roomId, updateRoom],
    );

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <Typography type={TextType.CAPTION_18_24}>
                            {isEdit ? 'Редактирование чата' : 'Создать чат'}
                        </Typography>
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onDismiss}>
                            <IonIcon icon={close} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Form<CreateChatValues>
                    validate={isEdit ? validateEditChat : validateCreateChat}
                    onSubmit={handleSubmit}
                    mutators={{ ...arrayMutators }}
                    initialValues={initialValues}
                >
                    {({ handleSubmit, valid }) => (
                        <IonList className={cx('create-chat-modal__form')}>
                            {!isEdit && (
                                <IonItem>
                                    <IonLabel>Личный</IonLabel>
                                    <CustomToggleField name="isPrivate" />
                                </IonItem>
                            )}
                            <CustomInputField label="Название чата" inputType="input" name="name" />
                            <CustomInputField label="Описание чата" inputType="input" name="description" />
                            {!isEdit && (
                                <>
                                    <FieldArray<CustomSelectableValue> name="members">
                                        {({ fields, meta }) => (
                                            <>
                                                <CustomSearchBar
                                                    errorMessage={meta.error as string}
                                                    hasError={!!meta.error && !!fields.length}
                                                    loading={isLoading}
                                                    label="Участники"
                                                    onSearch={handleSearch}
                                                    getItemElement={(el) => (
                                                        <IonItem key={el.id}>
                                                            <IonCheckbox
                                                                slot="start"
                                                                checked={
                                                                    !!fields?.value?.find((item) => item.id === el.id)
                                                                }
                                                                value={el}
                                                                onIonChange={(event) => {
                                                                    if (event.target.checked)
                                                                        fields.push({
                                                                            id: el.id,
                                                                            label: `${el.username} (${el.name})`,
                                                                        });
                                                                    else
                                                                        fields.remove(
                                                                            fields?.value?.findIndex(
                                                                                (item) => item.id === el.id,
                                                                            ),
                                                                        );
                                                                }}
                                                            />
                                                            <Typography type={TextType.CAPTION_16_24}>
                                                                {el.name}
                                                            </Typography>
                                                        </IonItem>
                                                    )}
                                                    data={data ?? []}
                                                />
                                                <div className={cx('create-chat-modal__chips')}>
                                                    {fields?.map((field, index) => (
                                                        <CustomChipField
                                                            name={field}
                                                            key={field}
                                                            onRemove={() => fields.remove(index)}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </FieldArray>
                                </>
                            )}

                            <IonFab slot="fixed" horizontal="end" vertical="bottom">
                                <IonFabButton disabled={!valid} onClick={handleSubmit}>
                                    <IonIcon icon={checkmark} />
                                </IonFabButton>
                            </IonFab>
                        </IonList>
                    )}
                </Form>
            </IonContent>
        </>
    );
};
