import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../AuthSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const userRole = useSelector(state => state.auth.role);

  return (
    <nav className="justify-content-around navbar navbar-expand-lg navbar-light bg-light">
      <div className="container ">
        {isAuthenticated ? (
          <Link className="navbar-brand" to="/">ZimaPeak</Link>
        ) : (
          <div className="col-12 text-center">ZimaPeak</div>
        )}
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
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
                </>
              )}

              {/* Add other authenticated menu items here */}
            </ul>
          )}
          {!isAuthenticated && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {/* Add non-authenticated menu items here */}
              </li>
            </ul>
          )}
          {isAuthenticated && (
            <ul className="navbar-nav ml-auto d-flex justify-content-end">
              {/* Add profile, settings, and search icons for authenticated users */}
              <button className='btn btn-link text-danger text-decoration-none' onClick={handleLogout}>Logout</button>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
