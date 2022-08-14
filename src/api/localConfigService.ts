import { Storage } from '@capacitor/storage';
import { Theme } from 'types/localConfig';
import { LocalStorageItems } from 'types/localStorage';

class LocalConfigService {
    saveTheme = async (theme: Theme) => {
        await Storage.set({ key: LocalStorageItems.THEME, value: theme });

        return theme;
    };

    getTheme = async () => {
        const result = await Storage.get({ key: LocalStorageItems.THEME });

        return result.value;
    };
}

export const localConfigService = new LocalConfigService();
