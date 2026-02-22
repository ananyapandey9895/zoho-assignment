import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // Redirect to signin if no user is found
        return <Navigate to="/signin" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
