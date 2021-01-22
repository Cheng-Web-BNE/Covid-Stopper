import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import {
    HOME_URL,
    INSTRUCTION_URL,
    LOGIN_URL,
    REGISTRATION_URL,
} from "../URLMAP";

interface ProtectedRouteProps {
    component: React.ComponentType<any>;
    path: string;
    exact?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component: ProtectedComponent,
    ...rest
}) => {
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const isUserLogin = await isLoggedIn();
            setIsActive(isUserLogin);
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) return <div>Please wait...</div>;

    return (
        <Route
            {...rest}
            render={(routeProps) => {
                const currentPath = routeProps.location.pathname;
                if (!isActive) {
                    if (currentPath !== INSTRUCTION_URL) {
                        return <Redirect to={INSTRUCTION_URL} />;
                    }
                }
                if (isActive) {
                    if (
                        currentPath === INSTRUCTION_URL ||
                        currentPath === LOGIN_URL ||
                        currentPath === REGISTRATION_URL
                    )
                        return <Redirect to={HOME_URL} />;
                }

                return <ProtectedComponent {...routeProps} />;
            }}
        />
    );
};
