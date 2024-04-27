import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const UserReport = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
    const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
          // Get current date in EST timezone
          const currentDate = dayjs().format('YYYY-MM-DD');
  
          // Fetching user data
          const usersResponse = await axios.get(`${baseUrl}/users`, {
              headers: {
                  Authorization: `Bearer ${token}` // Include token in the request headers
              }
          });
          const users = usersResponse.data.filter(user => user.role === 'user' || user.role === 'admin');
  
          // Fetching contacts added data for the current day
          const contactsResponse = await axios.get(`${baseUrl}/data?date=${currentDate}`, {
              headers: {
                  Authorization: `Bearer ${token}` // Include token in the request headers
              }
          });
          const contactsData = contactsResponse.data;
  
          // Fetching emails sent data for the current day
          const emailsResponse = await axios.get(`${baseUrl}/get-sent-emails?date=${currentDate}`, {
              headers: {
                  Authorization: `Bearer ${token}` // Include token in the request headers
              }
          });
          const emailsData = emailsResponse.data;
  
          // Fetching meetings set data for the current day
          const meetingsResponse = await axios.get(`${baseUrl}/get-event`, {
              headers: {
                  Authorization: `Bearer ${token}` // Include token in the request headers
              }
          });
          const meetingsData = meetingsResponse.data;
  
          // Combine user data with contacts added, emails sent, and meetings set
          const combinedData = users.map(user => {
              const contactsAdded = contactsData.filter(contact => contact.added_by === user.username).length;
              const emailsSent = emailsData.filter(email => email.from_email === user.email).length;
              const meetingsSet = meetingsData.filter(meeting => meeting.added_by === user.id).length;
              return {
                  name: user.fullname,
                  contactsAdded,
                  emailsSent,
                  meetingsSet
              };
          });
  
          // Update state with combined data
          setUserData(combinedData);
          setLoading(false);
      } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
      }
  };
  

    fetchUserData();
}, [token]); // Add token to the dependency array


  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="contactsAdded" fill="#8884d8" />
            <Bar dataKey="emailsSent" fill="#FFCE21" />
            <Bar dataKey="meetingsSet" fill="#FF2145" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UserReport;
