import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './panel/Login';
import ProtectedRoute from './ProtectedRoute';

import Contacts from './panel/Contacts';
import Compose from './panel/Compose';
import Emails from './panel/Emails';
import Trash from './panel/Trash';

import MemberDashboard from './panel/User/UserDashboard';
import AdminDashboard from './panel/Admin/AdminDashboard';

function App() {
  const userRole = useSelector(state => state.auth.role);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              {userRole === 'admin' && <AdminDashboard />}
              {userRole === 'user' && <MemberDashboard />}
            </ProtectedRoute>
          } />
          <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
          <Route path="/compose" element={<ProtectedRoute><Compose /></ProtectedRoute>} />
          <Route path="/emails" element={<ProtectedRoute><Emails /></ProtectedRoute>} />
          {userRole === 'admin' && (
            <Route path="/trash" element={<ProtectedRoute><Trash /></ProtectedRoute>} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
