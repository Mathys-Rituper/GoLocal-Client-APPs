import { FC, MouseEventHandler } from 'react';
import { ReactOidcHistory } from '../routes/withRouter';
declare type SessionLostProps = {
    onAuthenticate?: MouseEventHandler;
};
export declare const SessionLost: FC<SessionLostProps>;
declare type SessionLostContainerProps = {
    location: Location;
    history?: ReactOidcHistory;
};
export declare const SessionLostContainer: FC<SessionLostContainerProps>;
declare const _default: (props: any) => JSX.Element;
export default _default;
//# sourceMappingURL=SessionLost.component.d.ts.map