import { HTMLAttributes } from 'react';
import type { JSX } from '@ionic/core/components';

export type ButtonProps = JSX.IonButton & HTMLAttributes<HTMLIonButtonElement> & { loading?: boolean };
