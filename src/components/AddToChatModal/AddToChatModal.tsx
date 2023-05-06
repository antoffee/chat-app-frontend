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
    IonIcon,
    IonItem,
    IonList,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import cnBind, { Argument } from 'classnames/bind';
import arrayMutators from 'final-form-arrays';
import { checkmark, close } from 'ionicons/icons';
import debounce from 'lodash.debounce';
import { useAddToGroupRoomMutation } from 'store/sockets';
import { useLazySearchUsersQuery } from 'store/users';
import { CustomSelectableValue } from 'types/select';

import { validateAddToChat } from 'components/AddToChatModal/AddToChatModal.utils';
import { CustomSearchBar } from 'components/CustomSearchBar';
import { CustomChipField } from 'components/Fields/CustomChipField';
import { TextType, Typography } from 'components/Typography';

import { AddToChatModalProps, AddToChatValues } from './AddToChatModal.types';

import styles from './AddToChatModal.module.scss';

const cx = cnBind.bind(styles) as (...args: Argument[]) => string;

export const AddToChatModal: React.FC<AddToChatModalProps> = ({ onDismiss, roomId }) => {
    const [searchUsers, { isLoading, data }] = useLazySearchUsersQuery();
    const [addToGroupRoom] = useAddToGroupRoomMutation();

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
        async (values: AddToChatValues) => {
            await addToGroupRoom(values.members.map((member) => ({ userId: member.id, roomId })));
            onDismiss?.();
        },
        [addToGroupRoom, onDismiss, roomId],
    );

    return (
        <>
            <IonToolbar>
                <IonTitle>
                    <Typography type={TextType.CAPTION_18_24}>Добавить в чат пользователей</Typography>
                </IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={onDismiss}>
                        <IonIcon icon={close} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            <IonContent>
                <Form<AddToChatValues>
                    validate={validateAddToChat}
                    onSubmit={handleSubmit}
                    mutators={{ ...arrayMutators }}
                >
                    {({ handleSubmit, valid }) => (
                        <IonList className={cx('add-to-chat-modal__form')}>
                            <FieldArray<CustomSelectableValue> name="members">
                                {({ fields }) => (
                                    <>
                                        <CustomSearchBar
                                            loading={isLoading}
                                            label="Members"
                                            onSearch={handleSearch}
                                            getItemElement={(el) => (
                                                <IonItem key={el.id}>
                                                    <IonCheckbox
                                                        slot="start"
                                                        checked={!!fields?.value?.find((item) => item.id === el.id)}
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
                                                    <Typography type={TextType.CAPTION_16_24}>{el.name}</Typography>
                                                </IonItem>
                                            )}
                                            data={data ?? []}
                                        />
                                        <div className={cx('add-to-chat-modal__chips')}>
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
