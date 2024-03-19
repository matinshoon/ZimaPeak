import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './panel/Login';
import ProtectedRoute from './ProtectedRoute';

import Contacts from './panel/Contacts';
import Email from './panel/Email';

import MemberDashboard from './panel/User/UserDashboard';
import AdminDashboard from './panel/Admin/AdminDashboard';
import Register from './panel/Admin/RegisterUser';

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
          <Route path="/email" element={<ProtectedRoute><Email /></ProtectedRoute>} />
          {userRole === 'admin' && (
            <Route path="/adduser" element={<ProtectedRoute><Register /></ProtectedRoute>} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
