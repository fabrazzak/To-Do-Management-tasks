import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import auth from '../../../firebase.config.js';
import axios from "axios";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState([]);

  
  

    //   login with gmail
    const loginWithGoogle = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)

    }





    // signout user

    const singOut = () => {
        return signOut(auth)

    }





    //  Get the currently signed -in use


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            setUser(currentUser)
            setLoading(false)


        });
        return () => {
            unsubscribe()


        }


    }, [])




    const info = {  loginWithGoogle, user, singOut, loading, }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;