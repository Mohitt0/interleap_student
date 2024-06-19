// import './App.css';
import React, { useEffect, useState } from 'react';
import { ReactComponent as CompanyLogo2 } from '../../Assets/Rooman_Logo.svg'
import { Button, Input } from '@mui/joy';
import './LoginWithEmail.css'
import '../../Common/Common.css'
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginWithEmail({ setIsloggedIn }) {

    const navigate = useNavigate()
    const [OTP, setOTP] = useState();
    const [email, setEmail] = useState();
    const [sendOTP, setSendOTP] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [otpErrorMessage, setOtpErrorMessage] = useState();
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showOtpErrorMessage, setShowOtpErrorMessage] = useState(false);
    const [studentId, setStudentId] = useState();
    const [loading, setLoading] = useState(false);
    const [validateLoading, setValidateLoading] = useState(false);

    const sendOtpToEmail = async () => {
        try {
            setLoading(true)
            const { data } = await axios.post(`https://interleap-course-generation-backend.onrender.com/student/otp/generate`, {
                email: email
            })
            setStudentId(data?.data?.student_id)
            setSendOTP(true)
            setLoading(false)
        }
        catch (e) {
            setLoading(false)
            if (e.response) {
                setErrorMessage(e.response.data?.message)
                setShowErrorMessage(true)
            }
            console.log(e.message)
        }
    }

    const validateOtp = async () => {
        try {
            setValidateLoading(true)
            const { data } = await axios.post(`https://interleap-course-generation-backend.onrender.com/student/otp/authenticate`, {
                student_id: studentId,
                otp: Number(OTP)
            })
            setValidateLoading(false)
            // setIsloggedIn(true)
            localStorage.setItem("student_data", JSON.stringify(data.data))
            navigate('/')
        }
        catch (e) {
            if (e.response) {
                setOtpErrorMessage(e.response.data?.message)
                setShowOtpErrorMessage(true)
            }
            setValidateLoading(false)
        }
    }

    return (
        <div className="login-with-email">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="company-name" style={{ marginBottom: 6 }}>
                    <CompanyLogo2 />
                </div>
                <span className='powered-by-interleap'>powered by Interleap</span>
            </div>
            <div className='content'>
                <div className='mb-5 font-semibold'>Enter You Email ID</div>
                <div className='common-input-field' style={{ width: '100%' }}>
                    {/* <div className='head'>Email*</div> */}
                    <Input
                        type='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setShowErrorMessage(false)
                        }}
                        placeholder='Email'
                    />
                    {
                        showErrorMessage &&
                        <div className='error-message'>{errorMessage}</div>
                    }
                </div>
                {
                    sendOTP ?
                        <div style={{ width: '100%', marginTop: 15, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%' }} className='common-input-field'>
                                <div className='head'>Enter OTP</div>
                                <Input
                                    type='number'
                                    value={OTP}
                                    onChange={(e) => {
                                        setOTP(e.target.value)
                                        setShowOtpErrorMessage(false)
                                    }}
                                    placeholder='OTP'
                                />
                                {
                                    showOtpErrorMessage &&
                                    <div className='error-message'>{otpErrorMessage}</div>
                                }
                            </div>
                            {
                                validateLoading ?
                                    <button
                                        className='w-full bg-white text-[#050519] rounded font-semibold text-lg p-1'

                                        style={{ width: 120, marginTop: 25 }}
                                    ><CircularProgress size={18} color="inherit" /></button>
                                    :
                                    <button
                                        className='w-full bg-white text-[#050519] rounded font-semibold text-lg p-1'

                                        onClick={() => {
                                            if (OTP) {
                                                validateOtp()
                                            }
                                            else if (!OTP) {
                                                setOtpErrorMessage("Please Enter Email")
                                                setShowOtpErrorMessage(true)
                                            }
                                        }}
                                        style={{ width: 120, marginTop: 25 }}
                                    >Submit</button>
                            }

                        </div>
                        :
                        <div className='mt-[25px] w-full'>
                            {
                                loading ?
                                    <button
                                        className='w-full bg-white text-[#050519] rounded font-semibold text-md'
                                    ><CircularProgress size={18} color="inherit" /></button>
                                    :
                                    <button
                                        className='w-full bg-white text-[#050519] rounded font-semibold text-base p-1'
                                        onClick={() => {
                                            if (email) {
                                                sendOtpToEmail()
                                            }
                                            else if (!email) {
                                                setErrorMessage("Please Enter Email")
                                                setShowErrorMessage(true)
                                            }
                                        }}
                                    >Continue With Email</button>
                            }
                        </div>
                }
            </div>
        </div>
    );
}

export default LoginWithEmail;
