export type ConfirmEmailModalProps = {
    initialStep?: ConfirmEmailStep;
    onDismiss?: () => void;
};

export enum ConfirmEmailStep {
    SEND_CODE,
    CONFIRM_CODE,
}
