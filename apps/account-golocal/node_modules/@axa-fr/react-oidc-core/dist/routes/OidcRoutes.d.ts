import React, { ComponentType } from 'react';
import { UserManagerSettings } from 'oidc-client';
declare type OidcRoutesProps = {
    notAuthenticated?: ComponentType;
    notAuthorized?: ComponentType;
    callbackComponent: ComponentType;
    sessionLost?: ComponentType;
    configuration: UserManagerSettings;
};
declare const _default: React.NamedExoticComponent<React.PropsWithChildren<OidcRoutesProps>>;
export default _default;
//# sourceMappingURL=OidcRoutes.d.ts.map