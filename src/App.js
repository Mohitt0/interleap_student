import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Login from './Components/Login/Login';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Home from "./Home/Home";
import { useState } from "react";

function App() {
  const [isloggedIn, setIsloggedIn] = useState(false)

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/login" element={<Login setIsloggedIn={setIsloggedIn} isloggedIn={isloggedIn} />} /> */}
          {/* <Route path="/*" element={isloggedIn ? <Home /> : <Navigate to="/login" />} /> */}
          <Route path="/*" element={isloggedIn ? <Home /> : <Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
