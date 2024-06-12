import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Components/Login/Login";

function AllRoutes() {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
