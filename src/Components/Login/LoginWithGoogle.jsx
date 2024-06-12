// import './App.css';
import React, { useEffect, useState } from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { ReactComponent as GoogleLogo } from '../../assets/Google_Logo.svg'

function LoginWithGoogle({ loginSuccessful }) {
    const [user, setUser] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            getUserInfo(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const getUserInfo = (user) => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then((res) => {
                    console.log(res.data)
                    localStorage.setItem('loginInfo', JSON.stringify( res.data))
                    loginSuccessful(res.data)
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <div className="login-button " onClick={() => { login() }}>
            <GoogleLogo />
            <p className='mt-0.5'>Continue with Google</p>
        </div>
    );
}

export default LoginWithGoogle;
