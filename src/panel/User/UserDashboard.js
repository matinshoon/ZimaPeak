import React from 'react';
import ContactsReport from '../../components/ContactsReport';
import EmailReport from '../../components/EmailsReport';
import MeetingReport from '../../components/MeetingReport';
import CalendarAgenda from '../../components/CalendarAgenda';
import TodoList from '../../components/TodoList';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Contacts Report */}
        <div className="col-md-6 col-lg-4">
          <div className="px-3 py-2">
            <ContactsReport />
          </div>
        </div>

        {/* Email Report */}
        <div className="col-md-6 col-lg-4">
          <div className="px-3 py-2">
            <EmailReport />
          </div>
        </div>

        {/* Meeting Report */}
        <div className="col-md-6 col-lg-4">
          <div className="px-3 py-2">
            <MeetingReport />
          </div>
        </div>

        {/* Calendar Agenda */}
        <div className="col-12 col-lg-8">
          <div className="px-3 py-2">
            <CalendarAgenda />
          </div>
        </div>

        {/* Todo List */}
        <div className="col-12 col-lg-4">
          <div className="px-3 py-2">
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
