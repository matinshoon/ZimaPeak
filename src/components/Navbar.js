import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../AuthSlice';
import axios from 'axios';
import UserDropdown from './UserDropdown';
import { NavDropdown } from 'react-bootstrap'; // Import Dropdown component from react-bootstrap

import logoBlue from '../images/logo-blue.png';


const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userStatus, setUserStatus] = useState(null);
  const loggedInUser = useSelector(state => state.auth.fullname);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.role);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');


  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    fetchOnlineUsers();
    fetchUserStatus();
  }, []);

  const fetchUserStatus = async () => {
    try {
      const sessionKey = localStorage.getItem('sessionKey');
      if (sessionKey) {
        const response = await axios.get(`${baseUrl}/users/status?id=${sessionKey}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the request headers
          }
        });
        setUserStatus(response.data.status);
      }
    } catch (error) {
      console.error('Error fetching user status:', error);
    }
  };

  const updateStatus = async (status) => {
    try {
      const sessionKey = localStorage.getItem('sessionKey');
      if (sessionKey) {
        await axios.put(`${baseUrl}/users/updateStatus?id=${sessionKey}`, { status }, {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the request headers
          }
        });
        setUserStatus(status);
        // Fetch online users after updating status
        fetchOnlineUsers();
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const fetchOnlineUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users/status`, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the request headers
        }
      });
      // const onlineUsersData = response.data.filter(user => user.status === 'online');
      const onlineUsersData = response.data.filter(user => user.status === 'online' || user.status === 'away');

      setOnlineUsers(onlineUsersData);
    } catch (error) {
      console.error('Error fetching online users:', error);
    }
  };


  return (
    <nav className="justify-content-around navbar navbar-expand-lg navbar-light bg-light">
      <div className="container w-100">
        {isAuthenticated ? (
          <Link className="navbar-brand" to="/">ZimaPeak</Link>
        ) : (
          <div className="col-12 d-flex align-items-center justify-content-center">
            <img src={logoBlue} alt="Blue Logo" className="d-flex justify-content-center" style={{ height: '50px', width: '50px' }} />
          </div>
        )}

        <button className="navbar-toggler" type="button" aria-label="Toggle navigation" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse justify-content-between ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
          {isAuthenticated && (
            <ul className="navbar-nav mr-auto">
              {userRole === 'admin' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <NavDropdown title="Contacts" id="basic-nav-dropdown">
                  <NavDropdown.Item><Link className="nav-link" to="/contacts">Contacts</Link></NavDropdown.Item>
                  <NavDropdown.Item><Link className="nav-link" to="/leads">Leads</Link></NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Emails" id="basic-nav-dropdown">
                    <NavDropdown.Item><Link className="dropdown-item" to="/compose">Compose</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="dropdown-item" to="/emails">Emails</Link></NavDropdown.Item>
                  </NavDropdown>
                  <li className="nav-item">
                    <Link className="nav-link" to="/calendar">Calendar</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/trash">Trash</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/casestudy">Case Study</Link>
                  </li>
                </>
              )}

              {userRole === 'user' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <NavDropdown title="Contacts" id="basic-nav-dropdown">
                  <NavDropdown.Item><Link className="nav-link" to="/contacts">Contacts</Link></NavDropdown.Item>
                  <NavDropdown.Item><Link className="nav-link" to="#">Leads</Link></NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Emails" id="basic-nav-dropdown">
                    <NavDropdown.Item><Link className="dropdown-item" to="/compose">Compose</Link></NavDropdown.Item>
                    <NavDropdown.Item><Link className="dropdown-item" to="/emails">Emails</Link></NavDropdown.Item>
                  </NavDropdown>
                  <li className="nav-item">
                    <Link className="nav-link" to="/calendar">Calendar</Link>
                  </li>
                </>
              )}
            </ul>
          )}
          {isAuthenticated && (
            <ul className="navbar-nav ml-auto d-flex align-items-center">
              <li className="nav-item dropdown">
                <UserDropdown
                  userStatus={userStatus}
                  onlineUsers={onlineUsers}
                  loggedInUser={loggedInUser}
                  updateStatus={updateStatus}
                  handleLogout={handleLogout}
                />
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
