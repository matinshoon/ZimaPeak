import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../AuthSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const loggedInUser = useSelector(state => state.auth.fullname);

  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.role);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="justify-content-around navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {isAuthenticated ? (
          <Link className="navbar-brand" to="/">ZimaPeak</Link>
        ) : (
          <div className="col-12 text-center">ZimaPeak</div>
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
                  <li className="nav-item">
                    <Link className="nav-link" to="/contacts">Contacts</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/email">Email</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/adduser">Register</Link>
                  </li>
                </>
              )}

              {userRole === 'user' && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contacts">Contacts</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/email">Email</Link>
                  </li>
                </>
              )}

              {/* Add other authenticated menu items here */}
            </ul>
          )}
          {isAuthenticated && (
            <ul className="navbar-nav ml-auto d-flex align-items-center">
              {/* Add profile, settings, and search icons for authenticated users */}
              <li className='mx-5'>Hello {loggedInUser}</li>
              <li type='button' className='link-danger text-decoration-none' onClick={handleLogout}>Logout<FontAwesomeIcon className='mx-1' icon={faRightFromBracket} /></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
