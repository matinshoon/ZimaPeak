import React from 'react';
import ContactsReport from '../../components/ContatcsReport';
import EmailReport from '../../components/EmailsReport';
import Calendly from '../../components/Calendly';


const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className='row'>
        <div className='col-lg-6 col-md-12 p-4'>
          <Calendly />
        </div>
        <div className='col-lg-6 col-md-12'> 
          <div className='row'>
            <div className='col-12 p-4'>
              <ContactsReport />
            </div>
            <div className='col-12 p-4'>
              <EmailReport />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
