import React, { useEffect, useState } from 'react'
import Chat from '../Chat/Chat'
import './Learn.css'
import YoutubeSmartClip from '../YoutubeSmartClip/YoutubeSmartClip'
import { CircularProgress, Slide } from '@mui/material'
import CodeEditor from '../CodeEditor/CodeEditor'
import axios from 'axios'
import { API } from '../../Config'

const Learn = () => {

    const [showYoutubeComponent, setShowYoutubeComponent] = useState(false);
    const [youtubeComponent, setYoutubeComponent] = useState(false);
    const [showCodeEditor, setShowCodeEditor] = useState(false);
    const [codeEditor, setCodeEditor] = useState(false);
    const [loading, setLoading] = useState(false)
    const [expandYoutubeComponent, setExpandYoutubeComponent] = useState(false)
    const [courseDetails, setCourseDetails] = useState()

    const handleShowYoutubeComponent = (t) => {
        setShowYoutubeComponent(t)
        setYoutubeComponent(true)
    }
    const handleShowCodeEditor = (t) => {
        setShowCodeEditor(t)
        setCodeEditor(true)
    }

    const continueCourse = async (courseId, studentID) => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${API}/course/continue-course?course_id=${courseId}&student_id=${studentID}`)
            setCourseDetails(data.data)
            setLoading(false)
        }
        catch (e) {
            setLoading(false)
            console.log(e.message)
        }
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         handleShowYoutubeComponent(true)
    //     }, 500);
    //     setTimeout(() => {
    //         handleShowCodeEditor(true)
    //     }, 1500);
    // }, [])

    useEffect(() => {
        continueCourse(1, 4)
    }, [])

    return (
        <div className='h-full w-full flex items-center justify-center'>
            {
                loading ?
                    <CircularProgress />
                    :
                    <div className='learn-container'>
                        <button
                            className='absolute'
                            onClick={() => {
                                setExpandYoutubeComponent(!expandYoutubeComponent)
                            }}
                            style={{ fontSize: 10, }}
                        >
                            Expand
                        </button>
                        <div className={`chats-wrapper ${showYoutubeComponent ? 'left' : ''}`}>
                            <Chat courseDetails={courseDetails} />
                        </div>

                        {/* {
                            youtubeComponent &&
                            <Slide direction="left" in={showYoutubeComponent} timeout={900}>
                                <div style={{ position: 'absolute', width: '47%', height: 'fit-content', right: '3%' }}>
                                    <div style={{}}>
                                        <YoutubeSmartClip expandYoutubeComponent={expandYoutubeComponent} setExpandYoutubeComponent={setExpandYoutubeComponent} />
                                    </div>
                                </div>
                            </Slide>
                        } */}
                        {/* {
                codeEditor &&
                <Slide direction="up" in={showCodeEditor} timeout={900}>
                    <div style={{ position: 'absolute', width: '47%', height: 'fit-content', right: '3%', bottom: '10px' }}>
                        <div style={{}}>
                            <CodeEditor expandYoutubeComponent={expandYoutubeComponent} setExpandYoutubeComponent={setExpandYoutubeComponent} />
                        </div>
                    </div>
                </Slide>
            } */}
                    </div>
            }

        </div>
    )
}

export default Learn