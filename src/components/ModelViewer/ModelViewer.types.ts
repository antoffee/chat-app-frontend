import { AvatarEditorProps } from 'components/AvatarEditor/AvatarEditor.types';

export type ModelViewerProps = {
    color?: string;
    mode?: 'avatar' | 'viewer' | 'editor';
} & Required<AvatarEditorProps>;
