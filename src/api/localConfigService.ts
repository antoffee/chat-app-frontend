import { Preferences } from '@capacitor/preferences';
import { Theme } from 'types/localConfig';
import { LocalStorageItems } from 'types/localStorage';

class LocalConfigService {
    public authHeader?: string;

    saveTheme = async (theme: Theme) => {
        await Preferences.set({ key: LocalStorageItems.THEME, value: theme });

        return theme;
    };

    getTheme = async () => {
        const result = await Preferences.get({ key: LocalStorageItems.THEME });

        return result.value;
    };

    saveHeader = async (header: string) => {
        const result = await Preferences.set({ key: LocalStorageItems.AUTH_HEADER, value: header });
        this.authHeader = header;

        return result;
    };

    getHeader = async () => {
        const result = await Preferences.get({ key: LocalStorageItems.AUTH_HEADER });

        return result.value;
    };

    initHeader = (header: string) => {
        this.authHeader = header;
    };

    removeHeader = async () => {
        await Preferences.remove({ key: LocalStorageItems.AUTH_HEADER });
        this.authHeader = undefined;
    };
}

export const localConfigService = new LocalConfigService();
