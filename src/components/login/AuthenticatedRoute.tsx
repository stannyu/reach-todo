import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type AuthPathProps = {
    isSignedIn: boolean,
    children: ReactElement
}

const AuthenticatedRoute: FunctionComponent<AuthPathProps> = ({isSignedIn, children}): ReactElement => {
    if(!isSignedIn) {
        return <Navigate to='/login' replace />
    }
    return children;
};

export default AuthenticatedRoute;