import React, { useCallback, useEffect } from 'react';

import { EnterKeyFormSubmitterProps } from './EnterKeyFormSubmitter.types';

export const EnterKeyFormSubmitter: React.FC<EnterKeyFormSubmitterProps> = ({ onSubmit, valid }) => {
    const handleKeyPress = useCallback(
        (e: KeyboardEvent) => {
            if (e.key?.toLowerCase() === 'enter' && valid) {
                onSubmit();
            }
        },
        [onSubmit, valid],
    );

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [handleKeyPress]);

    return null;
};
