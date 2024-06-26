import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const CalendarAgenda = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [showModal, setshowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    name: '',
    start_date: new Date(),
    end_date: new Date(),
    client_name: '',
    client_email: '',
    priority: 1,
    added_by: ''
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    document.body.classList.toggle('modal-open', showModal);
  }, [showModal]);

  useEffect(() => {
    // Fetch events from the server
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseUrl}/get-event`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Format events data for react-big-calendar
        const formattedEvents = response.data.map(event => ({
          ...event,
          start: new Date(event.start_date),
          end: new Date(event.end_date),
          title: event.name, // Display name of the event
          id: event.id // Store event ID
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // Run only once on component mount

  const handleSelectSlot = ({ start, end }) => {
    setSelectedDate(start);
    setshowModal(true);
  };

  const handleSelectEvent = event => {
    navigate(`/event/${event.id}`); // Navigate to event page with event ID
  };

  const currentDateEvents = events.filter(event =>
    moment(event.start).isSame(moment(), 'month')
  );

  return (
    <div className='card h-100'>
      <div className="card-body">
        <div className={`${showModal ? 'blur' : ''}`}>
          <Calendar
            localizer={localizer}
            events={currentDateEvents}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            views={['agenda']}
            defaultView='agenda'
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarAgenda;
