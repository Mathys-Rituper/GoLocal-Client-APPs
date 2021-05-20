import { Logger } from 'oidc-client';
export declare type ReactOidcLogger = Logger;
export declare const setLogger: (level: number, logger: Logger) => void;
export declare const oidcLog: {
    debug: (...msg: any[]) => void;
    info: (...msg: any[]) => void;
    warn: (...msg: any[]) => void;
    error: (...msg: any[]) => void;
    ERROR: 1;
    WARN: 2;
    INFO: 3;
    NONE: 0;
    DEBUG: 4;
};
//# sourceMappingURL=loggerService.d.ts.map