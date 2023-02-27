import { Storage } from '@capacitor/storage';
import { Theme } from 'types/localConfig';
import { LocalStorageItems } from 'types/localStorage';

class LocalConfigService {
    public authHeader!: string;

    saveTheme = async (theme: Theme) => {
        await Storage.set({ key: LocalStorageItems.THEME, value: theme });

        return theme;
    };

    getTheme = async () => {
        const result = await Storage.get({ key: LocalStorageItems.THEME });

        return result.value;
    };

    saveHeader = async (header: string) => {
        const result = await Storage.set({ key: LocalStorageItems.AUTH_HEADER, value: header });
        this.authHeader = header;

        return result;
    };

    getHeader = async () => {
        const result = await Storage.get({ key: LocalStorageItems.AUTH_HEADER });

        return result.value;
    };

    initHeader = (header: string) => {
        this.authHeader = header;
    };
}

export const localConfigService = new LocalConfigService();
