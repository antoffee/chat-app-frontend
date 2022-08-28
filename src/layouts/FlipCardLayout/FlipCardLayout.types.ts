import { CSSProperties } from 'react';

export type FlipCardLayoutProps = {
    children?: [JSX.Element, JSX.Element];
    contentDimensions?: CSSProperties;
    direction?: 'right' | 'left';
    isRotated?: boolean;
};
