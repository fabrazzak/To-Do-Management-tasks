import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <footer className="  flex flex-col   bg-[#181718] text-white rounded p-6">
                
                <aside>
                    <p className='text-center'>Copyright © {new Date().getFullYear()} - All right reserved by Tasks Manager</p>
                </aside>
            </footer>

        </div>
    );
};

export default Footer;