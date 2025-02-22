import React from 'react';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../assets/loading.json";

const Loading = () => {
    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <Lottie className='h-72' animationData={groovyWalkAnimation} loop={true} />;
            </div>;

        </div>
    );
};

export default Loading;