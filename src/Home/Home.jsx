import React, { useContext, useEffect } from 'react'
import ReactPlayer from 'react-player'
import AllRoutes from '../AllRoutes'
import './Home.css'
import { ReactComponent as CompanyLogo } from '../Assets/Rooman_Logo_2.svg'
import { useNavigate } from 'react-router-dom'
import { GeneralContext } from '../Context'

const Home = () => {

    const navigate = useNavigate()
    const { setStudentInfo } = useContext(GeneralContext);

    useEffect(() => {
        const data = localStorage.getItem("student_data")
        if (!data) {
            navigate('/login')
        }
        setStudentInfo(JSON.parse(data))
    }, [])

    return (
        <div className='home-container'>
            <div className="main-header">
                <div className="company-logo">
                    <CompanyLogo />
                </div>

                <div style={{ width: 250 }}></div>
            </div>

            <div className="home-content">
                <AllRoutes />
            </div>

        </div>
    )
}

export default Home