import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmailReport = () => {
  const [emailsSentToday, setEmailsSentToday] = useState(0);
  const [emailsSentThisMonth, setEmailsSentThisMonth] = useState(0);
  const [emailsSentYesterday, setEmailsSentYesterday] = useState(0);
  const [emailsSentLastMonth, setEmailsSentLastMonth] = useState(0);
  const [emailsOpenedThisMonth, setEmailsOpenedThisMonth] = useState(0);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchEmailsData();
  }, []);

  const fetchEmailsData = async () => {
    try {
        const response = await axios.get(`${baseUrl}/sendgrid-events`, {
            headers: {
                Authorization: `Bearer ${token}` // Include token in the request headers
            }
        });
        const events = response.data;

        // Get today's date in UTC
        const today = new Date().toISOString().slice(0, 10);

        // Get yesterday's date in UTC
        const yesterday = new Date(new Date() - 86400000).toISOString().slice(0, 10);

        // Get the first day of the current month in UTC
        const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);

        // Get the first day of the last month in UTC
        const firstDayOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().slice(0, 10);

        // Filter events sent today
        const emailsToday = events.filter(event => event.timestamp.slice(0, 10) === today && event.event_type === 'delivered').length;
        setEmailsSentToday(emailsToday);

        // Filter events sent yesterday
        const emailsYesterday = events.filter(event => event.timestamp.slice(0, 10) === yesterday && event.event_type === 'delivered').length;
        setEmailsSentYesterday(emailsYesterday);

        // Filter events sent this month
        const emailsThisMonth = events.filter(event => event.timestamp.slice(0, 10) >= firstDayOfMonth && event.event_type === 'delivered').length;
        setEmailsSentThisMonth(emailsThisMonth);

        // Filter events sent last month
        const emailsLastMonth = events.filter(event => event.timestamp.slice(0, 10) >= firstDayOfLastMonth && event.timestamp.slice(0, 10) < firstDayOfMonth && event.event_type === 'delivered').length;
        setEmailsSentLastMonth(emailsLastMonth);

        // Filter events opened this month
        const emailsOpenedThisMonth = events.filter(event => event.timestamp.slice(0, 7) === firstDayOfMonth.slice(0, 7) && event.event_type === 'open').length;
        setEmailsOpenedThisMonth(emailsOpenedThisMonth);
    } catch (error) {
        console.error('Error fetching email events:', error);
    }
};


  return (
    <div className="card h-100">
      <div className="card-body">
        <h2 className="card-title text-primary text-center">Email Report</h2>
        <ul className="list-group list-group-flush h-75 d-flex flex-column justify-content-between text-center">
          <li className="list-group-item">Total Emails Sent Today: {emailsSentToday}</li>
          <li className="list-group-item">Total Emails Sent Yesterday: {emailsSentYesterday}</li>
          <li className="list-group-item">Total Emails Sent This Month: {emailsSentThisMonth}</li>
          <li className="list-group-item">Total Emails Sent Last Month: {emailsSentLastMonth}</li>
          <li className="list-group-item">Emails Opened This Month: {emailsOpenedThisMonth}</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailReport;
