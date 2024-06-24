import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ProtectedRoute = ({ children }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.token) {
            actions.logout();
        }
    }, [store.token, actions]);

    if (!store.token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
