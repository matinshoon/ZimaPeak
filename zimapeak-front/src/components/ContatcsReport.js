import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactsReport = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [activeContacts, setActiveContacts] = useState([]);
  const [inactiveContacts, setInactiveContacts] = useState([]);
  const [contactsAddedToday, setContactsAddedToday] = useState(0);
  const [contactsAddedThisMonth, setContactsAddedThisMonth] = useState(0);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchAllContacts();
    fetchActiveContacts();
    fetchInactiveContacts();
    fetchContactsAddedToday();
    fetchContactsAddedThisMonth();
  }, []);

  const fetchAllContacts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/data`);
      setAllContacts(response.data);
    } catch (error) {
      console.error('Error fetching all contacts:', error);
    }
  };

  const fetchActiveContacts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/data?status=active`);
      setActiveContacts(response.data);
    } catch (error) {
      console.error('Error fetching active contacts:', error);
    }
  };

  const fetchInactiveContacts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/data?status=inactive`);
      setInactiveContacts(response.data);
    } catch (error) {
      console.error('Error fetching inactive contacts:', error);
    }
  };

  const fetchContactsAddedToday = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await axios.get(`${baseUrl}/data?date_added=${today}`);
      setContactsAddedToday(response.data.length);
    } catch (error) {
      console.error('Error fetching contacts added today:', error);
    }
  };
  
  const fetchContactsAddedThisMonth = async () => {
    try {
      const today = new Date();
      // Get the first day of the current month
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      // Convert the dates to ISO string format
      const startDate = firstDayOfMonth.toISOString().split('T')[0]; // First day of the month
      const endDate = today.toISOString().split('T')[0]; // Current date
      // Construct the query parameter with a range of dates
      const queryParams = `date_added>=${startDate}&date_added<=${endDate}`;
      // Make the request with the constructed query parameter
      const response = await axios.get(`${baseUrl}/data?${queryParams}`);
      // Update the state with the length of the response data
      setContactsAddedThisMonth(response.data.length);
    } catch (error) {
      console.error('Error fetching contacts added this month:', error);
    }
  };
  
  

  return (
    <div className="card">
    <div className="card-body">
        <h2 className="card-title text-success">Contacts Report</h2>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">Total Contacts: {allContacts.length}</li>
            <li className="list-group-item">Active Contacts: {activeContacts.length}</li>
            <li className="list-group-item">Inactive Contacts: {inactiveContacts.length}</li>
            <li className="list-group-item">Contacts Added Today: {contactsAddedToday}</li>
            <li className="list-group-item">Contacts Added This Month: {contactsAddedThisMonth}</li>
        </ul>
    </div>
</div>
  );
};

export default ContactsReport;
