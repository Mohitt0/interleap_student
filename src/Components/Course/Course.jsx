import React, { useEffect, useState } from 'react'
import TestBackground from '../../Assets/test_course.jpeg'
import './Course.css'
import axios from 'axios'
import { Collapse } from '@mui/material'
import { ReactComponent as Down_Icon } from '../../Assets/Down_Icon.svg'
import { useNavigate } from 'react-router-dom'

const Course = () => {

    const [courseDetails, setCourseDetails] = useState()
    const [drawers, setDrawers] = useState([]);
    const navigate = useNavigate()

    const handleShowChapterSummary = (chapterId) => {
        const newOpenDrawers = [];
        const currentDrawer = drawers[chapterId]
        newOpenDrawers[chapterId] = !currentDrawer;
        setDrawers(newOpenDrawers);
    }

    const getCourseDetails = async (courseId) => {
        try {
            const { data } = await axios.get(`https://interleap-course-generation-backend.onrender.com/course/course-details?course_id=${courseId}`)
            setCourseDetails(data.data)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getCourseDetails(1)
    }, [])

    return (
        <div
            className='course-container'
            style={{
                // background: `linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), url(${TestBackground}) lightgray 50% / cover no-repeat`
            }}
        >
            <div className="">
                {console.log(courseDetails)}
                <div className="course-heading">
                    Python Prgramming
                </div>
                <div className='course-description'>
                    9 weeks • 98 hrs • 1500 points
                </div>
            </div>
            <div className="course-details">
                {/* <div className="header">
                    <span>Course Plan</span>
                </div> */}
                <div className="line"></div>
                <div className='course-content'>
                    {
                        courseDetails?.children?.map((module, i) => (
                            <>
                                <div className="module">
                                    <div>
                                        <div className='text-[#F5F5FF]'>
                                            <span>Module {i + 1} - </span>
                                            <span>{module.node_name}</span>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <div className='text-[#A7A7A7] text-sm'>12-15 Jun</div>
                                            <div className='text-[#A7A7A7] text-sm'>95 points</div>
                                            <div className='text-[#A7A7A7] text-sm'>6 hrs, 1 Test</div>
                                        </div>
                                    </div>
                                    <div className='expand-icon-container' onClick={(event) => {
                                        event.stopPropagation();
                                        handleShowChapterSummary(i)
                                    }}>
                                        <Down_Icon />
                                    </div>
                                </div>
                                <Collapse in={drawers[i]}>
                                    <div className='chapter-summary text-left' style={{ fontFamily: 'Figtree, sans-serif' }}>
                                        {
                                            module?.children?.map((topic, j) => (
                                                <div className="topic">
                                                    <div>
                                                        <span>Topic {j + 1} - </span>
                                                        <span>{topic.node_name}</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Collapse>
                            </>

                        ))
                    }
                </div>
                <div className="line"></div>
                <div className="button-container">
                    <button
                        onClick={() => {
                            navigate('/learn')
                        }}
                    >
                        Start the Course
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Course