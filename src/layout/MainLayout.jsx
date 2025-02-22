import React from 'react';
import Header from "../sheared/Header/Header.jsx";
import Footer from "../sheared/Footer/Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
    const location = useLocation();
    return (
        <div className='w-full  '>
            {
                location.pathname =="/" ? <Outlet></Outlet> :
                    <div>
                        <Header></Header>
                        <Outlet></Outlet>
                        <Footer></Footer>
                    </div>
            }

        </div>
    );
};

export default MainLayout;