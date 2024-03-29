import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const UserReport = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get current date in EST timezone
        const currentDate = dayjs().format('YYYY-MM-DD');

        // Fetching user data
        const usersResponse = await axios.get(`${baseUrl}/users`);
        const users = usersResponse.data.filter(user => user.role === 'user');

        // Fetching contacts added data for the current day
        const contactsResponse = await axios.get(`${baseUrl}/data?date=${currentDate}`);
        const contactsData = contactsResponse.data;

        // Fetching emails sent data for the current day
        const emailsResponse = await axios.get(`${baseUrl}/get-sent-emails?date=${currentDate}`);
        const emailsData = emailsResponse.data;

        // Combine user data with contacts added and emails sent
        const combinedData = users.map(user => {
          const contactsAdded = contactsData.filter(contact => contact.added_by === user.id).length;
          const emailsSent = emailsData.filter(email => email.from_email === user.email).length;
          return {
            name: user.fullname,
            contactsAdded,
            emailsSent
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
  }, []);

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
            <Bar dataKey="emailsSent" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UserReport;
