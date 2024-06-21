import React, { useContext, useEffect, useState } from 'react'
import TestBackground from '../../Assets/test_course.jpeg'
import './Course.css'
import axios from 'axios'
import { CircularProgress, Collapse } from '@mui/material'
import { ReactComponent as Down_Icon } from '../../Assets/Down_Icon.svg'
import { ReactComponent as Ellipse_19 } from '../../Assets/Ellipse_19.svg'
import { useNavigate } from 'react-router-dom'
import { API } from '../../Config'
import { GeneralContext } from '../../Context'

const Course = () => {

    const [courseDetails, setCourseDetails] = useState()
    const [loading, setLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [drawers, setDrawers] = useState([]);
    const navigate = useNavigate()

    const { selectedCourse, studentInfo } = useContext(GeneralContext);

    const handleShowChapterSummary = (chapterId) => {
        const newOpenDrawers = [];
        const currentDrawer = drawers[chapterId]
        newOpenDrawers[chapterId] = !currentDrawer;
        setDrawers(newOpenDrawers);
    }

    const getCourseDetails = async () => {
        try {
            if (selectedCourse) {
                let url =
                    selectedCourse?.status === "PENDING"
                        ?
                        `${API}/course/course-details?course_id=${selectedCourse?.course_id}`
                        :
                        `${API}/course/continue-course?course_id=${selectedCourse?.course_id}&student_id=${studentInfo?.student_id}`
                setLoading(true)
                const { data } = await axios.get(url)
                console.log("OP")
                console.log(data?.data)
                setCourseDetails(data?.data)
                setLoading(false)
            }
        }
        catch (e) {
            setLoading(false)
            console.log(e.message)
        }
    }

    const handleStartCourse = async () => {
        try {
            setSubmitLoading(true)
            const { data } = await axios.post(`${API}/student/start-course`, {
                course_id: selectedCourse.course_id,
                student_id: studentInfo.student_id,
                batch_id: selectedCourse.batch_id
            })
            setCourseDetails(data.data)
            setSubmitLoading(false)
            navigate('/learn')
        }
        catch (e) {
            setSubmitLoading(false)
            console.log(e.message)
        }
    }

    useEffect(() => {
        getCourseDetails()
        if (selectedCourse?.status === "PENDING") {
            setDrawers([true])
        }
    }, [selectedCourse])

    return (
        <div className='h-full flex items-center justify-center'>
            {
                loading ?
                    <CircularProgress />
                    :
                    <div
                        className='course-container'
                        style={{
                            // background: `linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.80) 100%), url(${TestBackground}) lightgray 50% / cover no-repeat`
                        }}
                    >
                        <div className="">
                            <div className="course-heading">
                                {selectedCourse?.name}
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
                                        <div className={`${drawers[i] ? "bg-[#F4F4F4]" : ""} rounded-lg`}>
                                            <div className={`module`}>
                                                <div>
                                                    <div className={`rounded-lg flex items-center gap-2`}>
                                                        {/* <span>Module {i + 1} - </span> */}
                                                        <Ellipse_19 />
                                                        <span className={`${drawers[i] ? "text-black" : "text-[#6E6E6F]"}`}>{module?.node_name}</span>
                                                    </div>
                                                    {/* <div className='flex gap-2 items-center'>
                                                        <div className='text-[#A7A7A7] text-sm'>12-15 Jun</div>
                                                        <div className='text-[#A7A7A7] text-sm'>95 points</div>
                                                        <div className='text-[#A7A7A7] text-sm'>6 hrs, 1 Test</div>
                                                    </div> */}
                                                    <div className={`${drawers[i] ? "" : "hidden"} text-[#6E6E6F] text-xs font-semibold ml-6 mt-2`}>{module?.points} points</div>
                                                </div>
                                                <div className='expand-icon-container' onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleShowChapterSummary(i)
                                                }}>
                                                    <Down_Icon />
                                                </div>
                                            </div>
                                            <div className="line"></div>
                                            <Collapse in={drawers[i]}>
                                                <div className='chapter-summary text-left' style={{ fontFamily: 'Figtree, sans-serif' }}>
                                                    {
                                                        module?.children?.map((topic, j) => (
                                                            <div className="topic">
                                                                <div>
                                                                    <span>Topic {j + 1} - </span>
                                                                    <span>{topic?.node_name}</span>
                                                                </div>
                                                                <div className='flex items-center ml-auto'>
                                                                    {
                                                                        (selectedCourse?.status === "PENDING" && i == 0 && j == 0) ?
                                                                            <div className="button-container ml-auto">
                                                                                {
                                                                                    submitLoading ?
                                                                                        <button
                                                                                            className='text-white rounded-md w-[60px] flex items-center justify-center bg-[#3838F1] font-medium py-[3px]'
                                                                                        >
                                                                                            <CircularProgress style={{ color: 'black', height: 15, width: 15, color: 'white' }} />
                                                                                        </button>
                                                                                        :
                                                                                        <button
                                                                                            className='text-[12px] text-white rounded-md w-[60px] flex items-center justify-center bg-[#3838F1] font-medium'
                                                                                            onClick={() => {
                                                                                                handleStartCourse(1, 4, 1)
                                                                                            }}
                                                                                        >
                                                                                            {"Start"}
                                                                                        </button>
                                                                                }
                                                                            </div>
                                                                            :
                                                                            (i === 0 && j === 0) ?
                                                                                <div className="button-container ml-auto">
                                                                                    {
                                                                                        submitLoading ?
                                                                                            <button
                                                                                                className='text-white rounded-md w-[60px] flex items-center justify-center bg-[#3838F1] font-medium py-[3px]'
                                                                                            >
                                                                                                <CircularProgress style={{ color: 'black', height: 15, width: 15, color: 'white' }} />
                                                                                            </button>
                                                                                            :
                                                                                            <button
                                                                                                className='text-[12px] text-white rounded-md w-[60px] flex items-center justify-center bg-[#3838F1] font-medium'
                                                                                                onClick={() => {
                                                                                                    navigate('/learn')
                                                                                                }}
                                                                                            >
                                                                                                {"Start"}
                                                                                            </button>
                                                                                    }
                                                                                </div>
                                                                                :
                                                                                <></>
                                                                    }
                                                                    <div className='time text-xs ml-2 flex gap-2'>
                                                                        <span>2hrs</span>
                                                                        <span>{topic?.points} Pts</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </Collapse>
                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default Course