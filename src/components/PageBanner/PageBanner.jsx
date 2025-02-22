import React from 'react';
import {Link} from "react-router-dom";

const PageBanner = ({heading="notNeed",subTitle="notNeed",btn= "notNeed"}) => {
    return (
        <div>
            <div className='my-query-banner flex-col gap-6'>

                <div className='my-query-banner-overlay '></div>
                <h1 className='text-3xl text-white z-10 font-bold'>{heading}</h1>

                {subTitle === "notNeed" ? "" :
                    <p className=' text-[#d7d7d7] z-10 font-bold'>{subTitle}</p>
                } {btn === "notNeed" ? "" :
                <Link className='z-10' to='/add-queries'>
                        <button
                            className='z-10 btn border-none px-10 font-bold text-white bg-[#181718] hover:bg-[#be161e]'>{btn}
                        </button>
                    </Link>
                }
               


            </div>

        </div>
    );
};

export default PageBanner;