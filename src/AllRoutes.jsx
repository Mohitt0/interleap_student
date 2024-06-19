import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Components/Login/Login";
import Course from "./Components/Course/Course";
import Chat from "./Components/Chat/Chat";
import Learn from "./Components/Learn/Learn";
import Courses from "./Components/Courses/Courses";

function AllRoutes() {
    const location = useLocation();

    return (
        <>
            <Routes location={location} key={location.pathname}>
                <Route path="/login" element={<Login />} />
                <Route path="/course" element={<Course />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="" element={<Courses />} />
            </Routes>
        </>
    );
}

export default AllRoutes;
