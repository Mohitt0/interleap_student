import './Login.css';
import React, { useEffect, useState } from 'react';
import { ReactComponent as CompanyLogo2 } from '../../Assets/Rooman_Logo.svg'
// import LoginWithGoogle from './LoginWithGoogle';
import { Fade } from '@mui/material';
import { redirect, useNavigate } from "react-router-dom";
import RoomanLoginButton from '../../Assets/Rooman_login_button.png'
import LoginWithEmail from './LoginWithEmail';

function Login({setIsloggedIn, isloggedIn}) {

    // const navigate = useNavigate();
    const [fadeLogin, setFadeLogin] = useState(true);
    const [showLoginWithEmail, setShowLoginWithEmail] = useState(false);

    const insertUser = async (user) => {
        try {
            // const result = await supabase.from("interleap_auth").insert({ id: user.id, name: user.name, email: user.email, picture: user.picture, verified_email: user.verified_email });
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const loginSuccessful = (user) => {
        // getUser(user)
        setFadeLogin((prev) => !prev);
        setTimeout(() => {
            // setShowChat(true)
            // setShowLogin(false)
            // navigate("/");
        }, 500)
    }

    useEffect(() => {
        const user = localStorage.getItem('loginInfo')
        if (user) {
            // navigate("/");
        }
    }, [])

    return (

        <Fade in={fadeLogin} timeout={500}>
            <div className='h-full flex'>
                {
                    showLoginWithEmail ?
                        <div className='log-in-container'>
                            <LoginWithEmail setIsloggedIn={setIsloggedIn}/>
                        </div>
                        :
                        <div className="log-in-container">

                            <div className="company-name">
                                <CompanyLogo2 />
                            </div>
                            <span className='powered-by-interleap'>powered by Interleap</span>

                            <div className="content">
                                <span className='text-center'>Welcome to the next leap in AI assisted learning.</span>
                                <div className="login-button " onClick={() => {
                                    // handleLogin("77baeddf516559c69f79")
                                    // setFadeLogin(false)
                                    setShowLoginWithEmail(true)
                                }}>
                                    <img src={RoomanLoginButton} alt="" />
                                    <p>Login with email</p>
                                </div>
                            </div>
                            <div className="footer">
                                <div className="text">
                                    <span>Register with Email</span>
                                    <span>{" >"}</span>
                                </div>
                                <div className="text">
                                    <span>Give Feedback</span>
                                    <span>{" >"}</span>
                                </div>
                            </div>

                        </div>
                }
            </div>
        </Fade>
    );
}

export default Login;
