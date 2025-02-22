import React from 'react';
import  "./PageTitle.css"

import  img from  "../../assets/darkgrain.png"


const PageTitle = ({pageTitle}) => {
    return (
        <div>


            <div className="text-left relative">
                <div className=' py-4' style={{
                    backgroundImage: `url('${img}')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                }}>

                    <h2 className="text-2xl font-semibold  px-10 ">/ {pageTitle}</h2>
                </div>
                

            </div>

        </div>
    );
};

export default PageTitle;