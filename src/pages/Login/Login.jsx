import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../components/authProvider/AuthProvider.jsx";
import loginLotti from "../../assets/lottiFile/a.json";
import Lottie from 'lottie-react';
import axios from "axios"; // ✅ FIX: Import axios

const Login = () => {
    const { loginWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    
    const loginWithGoogleHandle = async () => {
        try {
            const userCredential = await loginWithGoogle();
            const user = userCredential.user;
            console.log(user);
            
            const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            };

            // ✅ FIX: Handle API response
            const res = await axios.post("https://to-do-mangements.vercel.app/users", userData);
            console.log(res.data);

            // ✅ FIX: Improved navigation handling
            navigate(location?.state?.from?.pathname || "/home");
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.message);
        }
    };

    return (
        <div>
            <Helmet>
                <title> Login | RecommendHub</title>
            </Helmet>

            <div className="gap-6 mx-auto justify-center items-center grid grid-cols-2">
                <div className="hidden h-screen bg-gray-100 dark:bg-gray-800 lg:block">
                    <Lottie className="h-screen" animationData={loginLotti} />
                </div>
                <div>
                    <div className="form-control pt-0 p-6 gap-6">
                        <button onClick={loginWithGoogleHandle}
                                className="btn btn-outline w-[80%] shadow-2xl mx-auto font-bold hover:bg-[#be161e] text-2xl">
                            Login with <FcGoogle /><span className='text-2xl'>oogle</span>
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
