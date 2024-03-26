import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faToggleOff, faToggleOn, faClock, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const UserDropdown = ({ userStatus, onlineUsers, loggedInUser, updateStatus, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'link-success';
      case 'away':
        return 'link-warning';
      case 'offline':
        return 'link-danger';
      default:
        return '';
    }
  };

  return (
    <div className="dropdown">
      <span
        className="link-dark dropdown-toggle d-flex justify-content-center align-items-center"
        type="button"
        id="dropdownMenuButton"
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faCircle} className={`mx-2 ${getStatusColor(userStatus)}`} style={{ height: '7px' }} />
        {loggedInUser}
      </span>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
        {onlineUsers.length > 0 ? (
          onlineUsers.map((user, index) => (
            <button key={index} className="dropdown-item" type="button">
              <FontAwesomeIcon icon={faCircle} className={`mx-2 ${getStatusColor(user.status)}`} style={{ height: '7px' }} />
              {user.fullname}
            </button>
          ))
        ) : (
          <button className="dropdown-item" type="button">
            No online user
          </button>
        )}
        <div className="dropdown-divider"></div>
        <button
          className={`dropdown-item ${userStatus === 'online' ? 'text-success' : 'text-danger'}`}
          onClick={() => updateStatus(userStatus === 'online' ? 'offline' : 'online')}
          type="button"
        >
          {userStatus === 'online' ? (
            <FontAwesomeIcon icon={faToggleOff} className="mx-2" />
          ) : (
            <FontAwesomeIcon icon={faToggleOn} className="mx-2" />
          )}
          {userStatus === 'online' ? 'Go Offline' : 'Go Online'}
        </button>
        <button className="dropdown-item text-secondary" onClick={() => updateStatus('away')} type="button">
          <FontAwesomeIcon icon={faClock} className="mx-2" />
          Set as Away
        </button>
        <button className="dropdown-item text-danger" onClick={handleLogout} type="button">
        <FontAwesomeIcon icon={faRightFromBracket} className="mx-2"/>Logout
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;
