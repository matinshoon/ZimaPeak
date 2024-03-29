import React from 'react';
import Register from './RegisterUser'
import UserControl from './UserControl'
import ContactsReport from '../../components/ContatcsReport';
import EmailReport from '../../components/EmailsReport';
import UserReport from '../../components/UserReport';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className='row d-flex'>
      <div className='col-12 p-4'>
          <UserReport />
        </div>
      </div>
      <div className='row d-flex'>
        <div className='col-4 p-4'>
          <ContactsReport />
        </div>
        <div className='col-4 p-4'>
          <EmailReport />
        </div>
        <div className='col-4 p-4'>
          <Register />
        </div>
      </div>
      <div className='row'>
        <div className='col-12 p-4'>
          <UserControl />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
