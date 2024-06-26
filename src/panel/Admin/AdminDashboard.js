import React from 'react';
import Register from './RegisterUser';
import UserControl from './UserControl';
import ContactsReport from '../../components/ContactsReport';
import EmailReport from '../../components/EmailsReport';
import UserReport from '../../components/UserReport';
import MeetingReport from '../../components/MeetingReport';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      {/* User Report */}
      <div className="row">
        <div className="col-12 p-4">
          <UserReport />
        </div>
      </div>

      {/* Contacts, Emails, and Meeting Reports */}
      <div className="row">
        <div className="col-12 col-md-4 p-4">
          <ContactsReport />
        </div>
        <div className="col-12 col-md-4 p-4">
          <EmailReport />
        </div>
        <div className="col-12 col-md-4 p-4">
          <MeetingReport />
        </div>
      </div>

      {/* User Control and Register */}
      <div className="row">
        <div className="col-12 col-md-8 p-4">
          <UserControl />
        </div>
        <div className="col-12 col-md-4 p-4">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
