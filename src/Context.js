import React, { createContext, useEffect, useState } from 'react';

// Create a new context
export const GeneralContext = createContext();

// Provider component
export const CourseProvider = ({ children }) => {

    const [currentCourse, setCurrentCourse] = useState()
    const [selectedCourse, setSelectedCourse] = useState()
    const [studentInfo, setStudentInfo] = useState()

    return (
        <GeneralContext.Provider value={{ currentCourse, setCurrentCourse, studentInfo, setStudentInfo, selectedCourse, setSelectedCourse }}>
            {children}
        </GeneralContext.Provider>
    );
};