import React, { useContext } from 'react';
import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import Login from "../pages/Login/Login.jsx";

import FourOFour from "../pages/FourOFour/FourOFour.jsx";
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import ManageAllTask from '../pages/MangeAllTask/ManageAllTask.jsx';




const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/home",
                element: <PrivateRoute><HomePage></HomePage></PrivateRoute>,
            }, {
                path: "/manage-tasks",
                element: <PrivateRoute><ManageAllTask></ManageAllTask></PrivateRoute>,
            }
            , {
                path: "/",
                element: <Login></Login>,
            }
           
            , {
                path: "*",
                element: <FourOFour></FourOFour>
            }
        ],
    },
]);

export default router;