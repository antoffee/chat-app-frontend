class AppRoutes {
    public MONETIZATION_PREFIX = `monetization`;

    public ADS_PREFIX = `ads`;

    public PAYMENT_RESULT_PREFIX = 'payment-result';

    public PROFILE_PREFIX = `profile`;

    public TRANSACTIONS_PREFIX = `${this.PROFILE_PREFIX}/transactions`;

    public PAYOUTS_PREFIX = `${this.PROFILE_PREFIX}/payouts`;

    activateEmail = () => '/activate-email';

    verifyEmail = () => `/verify-email`;

    monetization = () => `/${this.MONETIZATION_PREFIX}`;

    paymentResult = (orderUid: string) => `/${this.PAYMENT_RESULT_PREFIX}/${orderUid}`;

    adsList = () => `/${this.ADS_PREFIX}`;

    createAd = () => `/${this.ADS_PREFIX}/create`;

    editAd = (uid: string) => `/${this.ADS_PREFIX}/edit/${uid}`;

    profile = () => `/${this.PROFILE_PREFIX}`;

    payoutsList = () => `/${this.PAYOUTS_PREFIX}`;

    payoutSettings = () => `/${this.PAYOUTS_PREFIX}/settings`;

    editBankAccountPayoutSettings = () => `/${this.PAYOUTS_PREFIX}/settings/edit/bank-account`;

    editBankCardPayoutSettings = () => `/${this.PAYOUTS_PREFIX}/settings/edit/bank-card`;

    transactions = () => `/${this.TRANSACTIONS_PREFIX}`;
}

export const appRoutes = new AppRoutes();
