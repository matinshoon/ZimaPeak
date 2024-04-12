import React from 'react';
import ContactsReport from '../../components/ContatcsReport';
import EmailReport from '../../components/EmailsReport';
import MeetingReport from '../../components/MeetingReport';
import CalendarAgenda from '../../components/CalendarAgenda';
import TodoList from '../../components/TodoList';


const Dashboard = () => {
  return (
    <div className="container-fluid d-flex">
            <div className='col-4 d-flex flex-column'>
        <div className='px-4 pt-2'>
          <ContactsReport />
        </div>
        <div className='px-4 pt-3'>
          <EmailReport />
        </div>
        <div className='px-4 pt-3'>
          <MeetingReport />
        </div>
      </div>
      <div className='col-4'>
        <div className='col-lg-12 col-md-12 pt-2 h-100'>
          <CalendarAgenda />
        </div>
      </div>
      <div className='col-4'>
        <div className='col-lg-12 col-md-12 px-4 pt-2'>
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;