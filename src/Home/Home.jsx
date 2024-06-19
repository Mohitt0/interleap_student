import React from 'react'
import ReactPlayer from 'react-player'
import AllRoutes from '../AllRoutes'
import './Home.css'
import { ReactComponent as CompanyLogo } from '../Assets/Rooman_Logo_2.svg'

const Home = () => {

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