import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MeetingReport = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');

  // State to store meetings data
  const [meetingsData, setMeetingsData] = useState({
    today: 0,
    yesterday: 0,
    thisMonth: 0,
    lastMonth: 0,
    byYou: 0
  });

  useEffect(() => {
    // Fetch meetings data from the server
    const fetchMeetingsData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/get-event`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Calculate the number of meetings set today, yesterday, this month, last month, and by you
        const today = response.data.filter(meeting => {
          const meetingDate = new Date(meeting.start_date);
          const todayDate = new Date();
          return meetingDate.toDateString() === todayDate.toDateString();
        }).length;

        const yesterday = response.data.filter(meeting => {
          const meetingDate = new Date(meeting.start_date);
          const yesterdayDate = new Date();
          yesterdayDate.setDate(yesterdayDate.getDate() - 1);
          return meetingDate.toDateString() === yesterdayDate.toDateString();
        }).length;

        const thisMonth = response.data.filter(meeting => {
          const meetingDate = new Date(meeting.start_date);
          const todayDate = new Date();
          return meetingDate.getMonth() === todayDate.getMonth() && meetingDate.getFullYear() === todayDate.getFullYear();
        }).length;

        const lastMonth = response.data.filter(meeting => {
          const meetingDate = new Date(meeting.start_date);
          const todayDate = new Date();
          return (
            meetingDate.getMonth() === todayDate.getMonth() - 1 &&
            meetingDate.getFullYear() === todayDate.getFullYear()
          );
        }).length;

        const byYou = response.data.filter(meeting => meeting.added_by === localStorage.getItem('sessionKey')).length;

        // Update the meetingsData state with the calculated values
        setMeetingsData({
          today,
          yesterday,
          thisMonth,
          lastMonth,
          byYou
        });
      } catch (error) {
        console.error('Error fetching meetings data:', error);
      }
    };

    fetchMeetingsData();
  }, []); // Run only once on component mount

  return (
    <div className="card h-100">
      <div className="card-body">
        <h2 className="card-title text-primary text-center">Meetings Report</h2>
        <ul className="list-group list-group-flush h-75 d-flex flex-column justify-content-between text-center">
          <li className="list-group-item">Meetings set Today: {meetingsData.today}</li>
          <li className="list-group-item">Meetings set Yesterday: {meetingsData.yesterday}</li>
          <li className="list-group-item">Meetings set This Month: {meetingsData.thisMonth}</li>
          <li className="list-group-item">Meetings set Last Month: {meetingsData.lastMonth}</li>
          <li className="list-group-item">Meetings set By you: {meetingsData.byYou}</li>
        </ul>
      </div>
    </div>
  );
};

export default MeetingReport;
