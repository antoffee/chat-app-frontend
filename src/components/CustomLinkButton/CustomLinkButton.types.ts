import * as Icons from 'ionicons/icons';

export type CustomLinkButtonProps = {
    href?: string;
    back?: boolean;
    iconName?: keyof typeof Icons;
};
