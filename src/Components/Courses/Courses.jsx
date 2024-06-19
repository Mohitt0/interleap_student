import React, { useEffect, useState } from 'react'
import './Courses.css'
import TestBackground from '../../Assets/test_course.jpeg'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faHourglass } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as Calendar } from '../../Assets/Calendar.svg'
import { ReactComponent as Time } from '../../Assets/Time.svg'
import axios from 'axios'
import { API } from '../../Config/index'

const Courses = () => {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    const getCourses = async () => {
        try {
            const { data } = await axios.get(`${API}/course/student-courses?student_id=4`)
            console.log(data?.data)
            setCourses(data?.data)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    return (
        <div className='courses-container'>
            <div className="head">
                <span className=''>Welcome, Dharmaraj! </span>
                <span style={{ color: 'rgba(0, 0, 0, 0.50)' }}>Pick any of your enrolled course to start AI assisted learning.</span>
            </div>
            <div className="courses-wrapper">
                {
                    courses.map((course) => (
                        <div
                            className="course"
                            onClick={() => {
                                navigate('/course')
                            }}
                            style={{
                                // background: `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(${TestBackground}) lightgray 50% / cover no-repeat`
                            }}
                        >

                            <div className='text-[#A7A7A7] flex gap-2 items-center text-xs'>
                                <Calendar />
                                Starting on 09 Aug
                            </div>

                            <div className='text-[#A7A7A7] flex gap-2 items-center text-xs mt-1'>
                                <FontAwesomeIcon icon={faHourglass} fontSize={14} />
                                9 Weeks
                            </div>

                            <div className="course-name">
                                {course?.name}
                            </div>
                            <div className='text-[#C3C3FF] flex gap-1 items-center text-[14px]'>
                                See Details
                                <FontAwesomeIcon icon={faArrowRight} fontSize={13} />
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Courses