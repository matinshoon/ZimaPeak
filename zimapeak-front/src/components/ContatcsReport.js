import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactsReport = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [activeContacts, setActiveContacts] = useState([]);
  const [inactiveContacts, setInactiveContacts] = useState([]);
  const [contactsAddedToday, setContactsAddedToday] = useState(0);
  const [contactsAddedThisMonth, setContactsAddedThisMonth] = useState(0);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchAllContacts();
    fetchActiveContacts();
    fetchInactiveContacts();
    fetchContactsAddedToday();
    fetchContactsAddedThisMonth();
  }, []);

  const fetchAllContacts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/data`, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the request headers
        }
      });
      setAllContacts(response.data);
    } catch (error) {
      console.error('Error fetching all contacts:', error);
    }
  };

  const fetchActiveContacts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/data?status=active`, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the request headers
        }
      });
      setActiveContacts(response.data);
    } catch (error) {
      console.error('Error fetching active contacts:', error);
    }
  };

  const fetchInactiveContacts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/data?status=inactive`, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the request headers
        }
      });
      setInactiveContacts(response.data);
    } catch (error) {
      console.error('Error fetching inactive contacts:', error);
    }
  };

  const fetchContactsAddedToday = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await axios.get(`${baseUrl}/data?date_added=${today}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the request headers
        }
      });
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
      const response = await axios.get(`${baseUrl}/data?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in the request headers
        }
      });
      // Update the state with the length of the response data
      setContactsAddedThisMonth(response.data.length);
    } catch (error) {
      console.error('Error fetching contacts added this month:', error);
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <h2 className="card-title text-primary text-center">Contacts Report</h2>
        <ul className="list-group list-group-flush h-75 d-flex flex-column justify-content-between text-center">
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
