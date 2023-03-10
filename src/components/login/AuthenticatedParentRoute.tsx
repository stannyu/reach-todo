import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type AuthPathProps = {
    isSignedIn: boolean
}

const AuthenticatedParentRoute: FunctionComponent<AuthPathProps> = ({isSignedIn}): ReactElement => {
    if(!isSignedIn) {
        return <Navigate to='/login' replace />
    }
    return <Outlet />;
};

export default AuthenticatedParentRoute;