import React from 'react';

import { Helmet } from 'react-helmet-async';

import groovyWalkAnimation from "../../assets/fourOfour.json";

import Lottie from 'lottie-react';
import {Link} from "react-router-dom";




const FourOFour = () => {
    return (
        <div className='md:h-[70vh]h min-h-screen flex flex-col justify-center items-center'>
            <Helmet>
                <title> Page Not Found | RecommendHub</title>
            </Helmet>
            <div className="card bg-base-100     mx-auto">
                <Lottie className='h-72' animationData={groovyWalkAnimation} loop={true} />;

                <h2 className='text-5xl font-bold text-center'>Page not found</h2>
                <Link to='/'> <button className='btn mt-5 text-center mx-auto flex bg-[#333] text-white hover:bg-red-600  '>Go Back</button> </Link>




            </div>


        </div>
    );
};

export default FourOFour;