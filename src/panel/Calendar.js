import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

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
  const [contactNames, setContactNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

    // Fetch contacts from the server
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/data`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Extract names from the contacts data
        const names = response.data.map(contact => contact.Name);
        setContactNames(names);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchEvents();
    fetchContacts();
  }, []); // Run only once on component mount

  const handleSelectSlot = ({ start, end }) => {
    setSelectedDate(start);
    setshowModal(true);
  };

  const handleCloseModal = () => {
    setshowModal(false);
    setEventDetails({
      name: '',
      start_date: new Date(),
      end_date: new Date(),
      client_name: '',
      client_email: '',
      priority: 1,
      added_by: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveEvent = async () => {
    try {
      const sessionKey = localStorage.getItem('sessionKey');

      // Format start_date and end_date using moment
      const formattedEventDetails = {
        ...eventDetails,
        start_date: moment(eventDetails.start_date).format("YYYY-MM-DD HH:mm"),
        end_date: moment(eventDetails.end_date).format("YYYY-MM-DD HH:mm"),
        added_by: sessionKey
      };

      await axios.post(`${baseUrl}/make-event`, formattedEventDetails, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      handleCloseModal();
      // You may want to update the events in the calendar here
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDropdownSelect = (name) => {
    setEventDetails(prevState => ({
      ...prevState,
      client_name: name
    }));
  };

  const handleEventClick = (event) => {
    navigate(`/event/${event.id}`); // Navigate to event page with event ID
  };

  const filteredContactNames = contactNames.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const eventComponent = ({ event }) => (
    <div>
      <p>{event.title}</p>
    </div>
  );

  return (
    <div>
      <div style={{ height: '94vh' }} className={`${showModal ? 'blur' : ''}`}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleEventClick} // Handle event click
          components={{
            event: eventComponent
          }}
        />
      </div>
      {showModal && (
        <div className="modal d-block">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Event</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Event Name:</label>
                  <input type="text" className="form-control" name="name" value={eventDetails.name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Date:</label>
                  <DatePicker
                    selected={eventDetails.start_date}
                    onChange={(date) => setEventDetails({ ...eventDetails, start_date: date })}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">End Date:</label>
                  <DatePicker
                    selected={eventDetails.end_date}
                    onChange={(date) => setEventDetails({ ...eventDetails, end_date: date })}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Client Name:</label>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      {eventDetails.client_name ? eventDetails.client_name : "Select Client"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ overflowY: "auto", maxHeight: "200px" }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search client name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      {filteredContactNames.map((name, index) => (
                        <Dropdown.Item key={index} onClick={() => handleDropdownSelect(name)}>
                          {name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="mb-3">
                  <label className="form-label">Client Email:</label>
                  <input type="email" className="form-control" name="client_email" value={eventDetails.client_email} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Priority:</label>
                  <input type="number" className="form-control" name="priority" value={eventDetails.priority} onChange={handleInputChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveEvent}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;
