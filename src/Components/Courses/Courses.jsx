import React, { useContext, useEffect, useState } from 'react'
import './Courses.css'
import TestBackground from '../../Assets/test_course.jpeg'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faHourglass } from '@fortawesome/free-solid-svg-icons'
import { ReactComponent as Calendar } from '../../Assets/Calendar.svg'
import { ReactComponent as Time } from '../../Assets/Time.svg'
import axios from 'axios'
import { API } from '../../Config/index'
import { GeneralContext } from '../../Context'

const Courses = () => {
    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    const { setSelectedCourse, studentInfo } = useContext(GeneralContext);

    const getCourses = async () => {
        try {
            if (studentInfo?.student_id) {
                const { data } = await axios.get(`${API}/course/student-courses?student_id=${studentInfo?.student_id}`)
                console.log(data?.data)
                setCourses(data?.data)
            }
        }
        catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        getCourses()
    }, [studentInfo?.student_id])

    return (
        <div className='courses-container'>
            {console.log(studentInfo)}
            <div className="head">
                <div className='text-[#050519] text-[32px]'>Welcome, {studentInfo?.name}! </div>
                <div className='text-[#050519] text-[17px] mt-3'>Check out your course progress and continue learning.</div>
            </div>
            <div className="courses-wrapper">
                {
                    courses.map((course) => (
                        <div
                            className="course"
                            onClick={() => {
                                setSelectedCourse(course)
                                navigate('/course')
                            }}
                            style={{
                                // background: `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(${TestBackground}) lightgray 50% / cover no-repeat`
                            }}
                        >
                            <div className="course-name">
                                {course?.name}
                            </div>
                            <div className='text-[#6E6E6F] flex gap-2 items-center text-xs mt-auto'>
                                <Calendar style={{ color: '#6E6E6F' }} />
                                12 Jun - 14 Aug (9 Weeks)
                            </div>

                            <div className='text-[#6E6E6F] flex gap-2 items-center text-xs mt-2'>
                                <FontAwesomeIcon icon={faHourglass} fontSize={14} />
                                Starting in 8 weeks
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Courses