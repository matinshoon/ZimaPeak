import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Login from './panel/Login';
import ProtectedRoute from './ProtectedRoute';

import Contacts from './panel/Contacts';
import Leads from './panel/Leads';
import Compose from './panel/Compose';
import Emails from './panel/Emails';
import Trash from './panel/Trash';
import CaseStudy from './panel/Admin/CaseStudy';


import MemberDashboard from './panel/User/UserDashboard';
import AdminDashboard from './panel/Admin/AdminDashboard';
import MyCalendar from './panel/Calendar';
import EventDetails from './panel/Event';

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
          <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
          <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
          <Route path="/compose" element={<ProtectedRoute><Compose /></ProtectedRoute>} />
          <Route path="/emails" element={<ProtectedRoute><Emails /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><MyCalendar /></ProtectedRoute>} />
          {userRole === 'admin' && (
            <>
              <Route path="/trash" element={<ProtectedRoute><Trash /></ProtectedRoute>} />
              <Route path="/casestudy" element={<ProtectedRoute><CaseStudy /></ProtectedRoute>} />
            </>
          )}
          <Route path="/event/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;