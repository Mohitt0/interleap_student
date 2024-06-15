import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Components/Login/Login";
import Course from "./Components/Course/Course";

function AllRoutes() {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
        <Route path="/course" element={<Course />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
