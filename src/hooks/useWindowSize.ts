import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'store';
import { setHeight, setWidth } from 'store/windowSize';

import { getWindowSize } from 'utils';

export const useWindowSize = () => {
    const dispatch = useAppDispatch();

    const [size, setSize] = useState(getWindowSize());

    const handleWindowResize = useCallback(() => setSize(getWindowSize()), []);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    useEffect(() => {
        dispatch(setWidth(size.width));
    }, [dispatch, size.width]);

    useEffect(() => {
        dispatch(setHeight(size.height));
    }, [dispatch, size.height]);
};
