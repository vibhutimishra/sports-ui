// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const { userId } = useParams();
    const storedUserId = useSelector((state) => state.user.userId);
    const isAuthenticated = Boolean(storedUserId) && storedUserId === userId;
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
