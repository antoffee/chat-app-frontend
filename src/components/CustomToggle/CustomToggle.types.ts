import { ComponentProps, HTMLAttributes } from 'react';
import { IonToggle } from '@ionic/react';

export type CustomToggleProps = Omit<ComponentProps<typeof IonToggle>, 'ref'> &
    HTMLAttributes<HTMLIonToggleElement> & { hasError?: boolean; errorMessage?: string };
