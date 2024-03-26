import React from 'react';
import ContactsReport from '../../components/ContatcsReport';
import EmailReport from '../../components/EmailsReport';
import UserReport from '../../components/UserReport';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className='row d-flex'>
        <div className='col-6 p-4'>
          <ContactsReport />
        </div>
        <div className='col-6 p-4'>
          <EmailReport />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
