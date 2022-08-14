import { createAsyncThunk } from '@reduxjs/toolkit';
import { localConfigService } from 'api/localConfigService';
import { Theme } from 'types/localConfig';

export const saveTheme = createAsyncThunk<Theme, Theme>('LOCAL_CONFIG/SAVE_THEME', localConfigService.saveTheme);

export const refreshTheme = createAsyncThunk<string | null>('LOCAL_CONFIG/UPDATE_THEME', localConfigService.getTheme);
