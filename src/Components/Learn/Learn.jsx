import React, { useEffect, useState } from 'react'
import Chat from '../Chat/Chat'
import './Learn.css'
import YoutubeSmartClip from '../YoutubeSmartClip/YoutubeSmartClip'
import { Slide } from '@mui/material'
import CodeEditor from '../CodeEditor/CodeEditor'

const Learn = () => {

    const [showYoutubeComponent, setShowYoutubeComponent] = useState(false);
    const [youtubeComponent, setYoutubeComponent] = useState(false);
    // const [showYoutubeComponent, setShowYoutubeComponent] = useState(false);
    // const [youtubeComponent, setYoutubeComponent] = useState(false);

    const handleShowYoutubeComponent = (t) => {
        setShowYoutubeComponent(t)
        setYoutubeComponent(true)
    }

    useEffect(() => {
        setTimeout(() => {
            handleShowYoutubeComponent(false)
        }, 500);
    }, [])

    return (
        <div className='learn-container'>
            <div className={`chats-wrapper ${showYoutubeComponent ? 'left' : ''}`}>
                <Chat />
            </div>

            {
                youtubeComponent &&
                <Slide direction="left" in={showYoutubeComponent} timeout={900}>
                    <div style={{ position: 'absolute', width: '47%', height: '89%', right: '3%' }}>
                        {/* <div style={{}}>
                            <YoutubeSmartClip />
                        </div> */}
                        {/* <Slide direction="bottom" in={showYoutubeComponent} timeout={900}>
                            <div style={{ }}>
                                <CodeEditor />
                            </div>
                        </Slide> */}
                    </div>
                </Slide>
            }

        </div>
    )
}

export default Learn