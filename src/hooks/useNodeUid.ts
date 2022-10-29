import { useMemo } from 'react';

export const createNodeUid = () =>
    'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, (character) => {
            const random = (Math.random() * 16) | 0;
            const newCharacter = character == 'x' ? random : (random & 0x3) | 0x8;

            return newCharacter.toString(16);
        })
        .replace(/[^a-zA-Z]/g, '');

export const useNodeUid = () => useMemo(() => createNodeUid(), []);
