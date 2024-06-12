// import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as Github_Logo } from '../../assets/Github_Logo.svg'

function LoginWithGithub({ loginSuccessful, setProfile }) {
    const [user, setUser] = useState([]);

    const handleLogin = async (code) => {
        try {
            // const result = await axios.post(`https://github.com/login/oauth/access_token?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&code=${code}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&accept=json`)
            // const result = await axios.post(
            //     'https://github.com/login/oauth/access_token',
            //     {
            //         client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
            //         client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
            //         code: code
            //     },
            //     {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }
            // );
            const result = await fetch(`https://github.com/login/oauth/access_token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
                    client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
                    code: code
                })
            });

            console.log(result)

            // const data = await fetch('https://github.com/login/oauth/access_token', {
            //     method: "POST",
            //     body: {
            //         client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
            //         client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
            //         code,
            //     },
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // }).then((response) => response.json());
            // console.log(data)

            // Fetch the user's GitHub profile
            // const userProfile = await fetch('https://api.github.com/user', {
            //     headers: {
            //         'Authorization': `Bearer ${accessToken}`,
            //         'User-Agent': 'Your-App-Name'
            //     }
            // });

            // Handle the user profile data (e.g., store it in your database and log the user in)
            // console.log(`Welcome, ${userProfile.data.name}!`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGitHubCallback = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');

        if (code) {
            handleLogin(code);
        }
    };

    useEffect(() => {
        // handleGitHubCallback();
    }, [])

    const login = () => {
        window.location.assign(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`)
    }

    return (
        <div>
            <div className="login-button " onClick={() => {
                handleLogin("77baeddf516559c69f79")
                // login()
            }}>
                <Github_Logo />
                <p className='mt-0.5'>Continue with Github</p>
            </div>
        </div>

    );
}

export default LoginWithGithub;
