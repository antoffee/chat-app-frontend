declare interface Window {
    cardTokenCallback: (token: string) => void;
    cardToken: string;
    ccTokenizer: CCTokenizer;
    Android?: {
        hideLoadingScreen?: () => void;
    };
    webkit?: {
        messageHandlers?: {
            hideLoadingScreen?: {
                postMessage: (data: Record<string, unknown>) => void;
            };
        };
    };
}

declare class CCTokenizer {
    constructor(options: {
        card: {
            expDateMonth: string | undefined;
            expDateYear: string | undefined;
            cardHolder?: string | undefined;
            expMonth?: number | undefined;
            expYear?: number | undefined;
            uid: string | null;
            type?: string | undefined;
        };
        format: string;
        errorHandler: (errorCode: string, errorMessage: string) => void;
    });

    loadToken: (cardToken: string) => void;

    tokenServiceUrl: string;

    generateToken: () => string;
}
