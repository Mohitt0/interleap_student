import React from 'react'
import ReactPlayer from 'react-player'
import AllRoutes from '../AllRoutes'
import './Home.css'

const Home = () => {

    return (
        <div className='home-container'>

            {/* <ReactPlayer
                url="https://vimeo.com/583715912/08c1e486b8"
                controls={true}
                width="500px"
                height="500px"
            /> */}

            <AllRoutes/>

        </div>
    )
}

export default Home