import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import Button from '@mui/material/Button';


function NavBar() {
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Redirect to the login page or any other desired page after logout
    window.location.href = '/';
  };

  // Get user role from local storage
  const userRole = localStorage.getItem('role');

  return (
    <div className="header">
      <img src={require("../assets/Logo.png")} alt="Logo" className="logo" id="logo" />
      <div className="NavBar">
        {/* <NavLink to="/" exact activeClassName="active"
          activeStyle={{ color: '#DB252A', textDecoration: 'none' }}
          style={{ color: 'black', textDecoration: 'none' }}
          hoverStyle={{ color: '#DB252A', textDecoration: 'none' }}
        >
          <li>Home</li>
        </NavLink> */}
        <NavLink to="/about" activeClassName="active"
          activeStyle={{ color: '#DB252A', textDecoration: 'none' }}
          style={{ color: 'black', textDecoration: 'none' }}
          hoverStyle={{ color: '#DB252A', textDecoration: 'none' }}
        >
          <li>About</li>
        </NavLink>
        <NavLink to="/manualentry" activeClassName="active"
          activeStyle={{ color: '#DB252A', textDecoration: 'none' }}
          style={{ color: 'black', textDecoration: 'none' }}
          hoverStyle={{ color: '#DB252A', textDecoration: 'none' }}
        >
          <li>Manual Entry</li>
        </NavLink>
        {userRole === 'admin' && (
          <NavLink to="/manualdashboard" activeClassName="active"
            style={{ textDecoration: "none" }}>
            <li>Dashboard</li>
          </NavLink>
        )}
        <Button variant="outlined" color="error" onClick={handleLogout}>
        Logout
      </Button>
        {/* <li  style={{ cursor: 'pointer' }}>Logout</li> */}
      </div>
      <div className="nav-right">
        <ul>
          <li>BSES Yamuna Power Ltd.</li>
          <li>BSES Rajdhani Power Ltd.</li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
