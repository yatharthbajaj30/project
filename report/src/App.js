
import './App.css';
import Data from './components/Data';
import EmployeeLogin from './components/Login';
import NavBar from "./components/NavBar";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    role: "", // 'admin' or 'user'
  });

  const handleLogin = (role) => {
    setUser({
      isAuthenticated: true,
      role: role,
    });
  };

  const handleLogout = () => {
    setUser({
      isAuthenticated: false,
      role: "",
    });
  };
  return (
    <div className="App">
      {user.isAuthenticated && <NavBar role={user.role} onLogout={handleLogout} />}
      
        <Routes>
        <Route
            path="/"
            element={<EmployeeLogin onLogin={handleLogin} />}
          />
        
            {!user.isAuthenticated ? (
            // Use the 'element' prop to render the desired component
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          ) : (<><Route path='/Data' element={<Data/>}></Route></>)}
        </Routes>
      
     
    </div>
  );
}

export default App;
