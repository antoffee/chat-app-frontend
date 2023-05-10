import { UserPhoto } from 'hooks/usePhotoGallery';

export type AvatarUploaderProps = {
    className?: string;
    isLoading?: boolean;
    onUploadSubmit?: (photo: UserPhoto) => void;
    onGenerateSubmit?: (photo: UserPhoto) => void;
};
