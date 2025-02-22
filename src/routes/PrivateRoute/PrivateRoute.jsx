import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import {AuthContext} from "../../components/authProvider/AuthProvider.jsx";
import Loading from "../../components/Loading/Loading.jsx";




const PrivateRoute = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <Loading></Loading >
    }

    if (user) {
        return children
    }
    return <Navigate to="/" state={location.pathname}></Navigate>

};

export default PrivateRoute;