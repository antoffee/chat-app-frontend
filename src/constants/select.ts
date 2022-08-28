import { GengerEnum } from 'types/gender';

import { ToggleButtonItem } from 'components/ToggleButtons/ToggleButtons.types';

export const GENDER_OPTIONS = Object.values(GengerEnum)
    .map((value) => typeof value === 'string' && { value, label: value })
    .filter(Boolean) as ToggleButtonItem[];
