import React, { useState } from 'react'
import './Courses.css'
import TestBackground from '../../Assets/test_course.jpeg'

const Courses = () => {
    const [courses, setCourses] = useState([1, 2, 3, 4, 5])
    return (
        <div className='courses-container'>
            <div className="head">
                <span className=''>Welcome, Rahul! </span>
                <span style={{ color: 'rgba(0, 0, 0, 0.50)' }}>Pick any of your enrolled course to start AI assisted learning.</span>
            </div>
            <div className="courses-wrapper">
                {
                    courses.map((course) => (
                        <div
                            className="course"
                            style={{
                                background: `linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(${TestBackground}) lightgray 50% / cover no-repeat`
                            }}>
                            <div className="">
                                <div className="course-heading">
                                    Python Prgramming
                                </div>
                                <div className='course-description'>
                                    Become a Python Programmer - L1
                                </div>
                            </div>
                            <div className='course-metadata'>
                                <span>6 Weeks</span>
                                <span>5 Levels</span>
                                <span>64030 Learners</span>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Courses