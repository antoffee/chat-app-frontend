import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { saveTheme } from 'store/localConfig';

export const useColorMode = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((store) => store.localConfig.theme);

    const toggleDarkTheme = useCallback(
        (isDark?: boolean) => {
            if (isDark) {
                void dispatch(saveTheme('dark'));
            } else {
                void dispatch(saveTheme('light'));
            }
        },
        [dispatch],
    );

    useEffect(() => {
        // Use matchMedia to check the user preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        toggleDarkTheme(prefersDark.matches);

        // Listen for changes to the prefers-color-scheme media query
        prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

        // Add or remove the "dark" class based on if the media query matches
    }, [toggleDarkTheme]);

    useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark');
    }, [theme]);
};
