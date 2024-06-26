import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment-timezone';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const { id } = useParams(); // Extract the eventId from route parameters
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Get user role from localStorage
  moment().tz('America/Toronto');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${baseUrl}/get-event/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEvent(response.data[0]); // Since the API response is an array, access the first element
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEvent();
  }, [baseUrl, id, token]);

  const getPriorityColor = () => {
    switch (event.priority) {
      case 1:
        return 'text-danger'; // Red color for priority 1
      case 2:
        return 'text-warning'; // Yellow color for priority 2
      case 3:
        return 'text-primary'; // Blue color for priority 3
      default:
        return ''; // Default color
    }
  };

  const handleDeleteEvent = async () => {
    setShowConfirmation(true);
  };

  const confirmDeleteEvent = async () => {
    try {
      await axios.delete(`${baseUrl}/delete-event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShowConfirmation(false);
      setShowSuccessMessage(true);
      // Optionally, redirect the user to another page or show a success message
    } catch (error) {
      console.error('Error deleting event:', error);
      // Handle error, show error message to the user
    }
  };

  const handleEditEvent = () => {
    setEditedEvent(event); // Set the edited event details
    setEditMode(true); // Enter edit mode
  };

  const handleSaveEvent = async () => {
    try {
      const startDateString = moment(editedEvent.start_date).tz('America/Toronto').format('YYYY-MM-DD HH:mm:ss');
      const endDateString = moment(editedEvent.end_date).tz('America/Toronto').format('YYYY-MM-DD HH:mm:ss');

      const editedEventData = {
        ...editedEvent,
        start_date: startDateString,
        end_date: endDateString
      };

      // Make PUT request to update the event
      await axios.put(`${baseUrl}/event-update/${id}`, editedEventData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setEvent(editedEventData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating event:', error);
      // Handle error, show error message to the user
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Event Details</h2>
      {event ? (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h3 className="card-title mb-4">{event.name}</h3>
              {userRole === 'admin' && !editMode && (
                <button className="btn btn-danger col-2 h-50" onClick={handleDeleteEvent}>Delete Event</button>
              )}
              {!editMode && (
                <button className="btn btn-primary col-1 h-50" onClick={handleEditEvent}>Edit Event</button>
              )}
            </div>
            {editMode ? (
              <div>
                <div className="mb-3">
                  <label className="form-label">Event Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedEvent.name}
                    onChange={(e) => setEditedEvent({ ...editedEvent, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Date:</label>
                  <DatePicker
                    selected={editedEvent.start_date ? new Date(editedEvent.start_date) : null}
                    onChange={(date) => {
                      console.log("Selected start date:", date);
                      const startDate = moment(date).tz('America/Toronto').format();
                      setEditedEvent(prevState => ({
                        ...prevState,
                        start_date: startDate
                      }));
                    }}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">End Date:</label>
                  <DatePicker
                    selected={editedEvent.end_date ? new Date(editedEvent.end_date) : null}
                    onChange={(date) => {
                      console.log("Selected end date:", date);
                      const endDate = moment(date).tz('America/Toronto').format();
                      setEditedEvent(prevState => ({
                        ...prevState,
                        end_date: endDate
                      }));
                    }}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Client Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedEvent.client_name}
                    onChange={(e) => setEditedEvent({ ...editedEvent, client_name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Client Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editedEvent.client_email}
                    onChange={(e) => setEditedEvent({ ...editedEvent, client_email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Priority:</label>
                  <select
                    className="form-select"
                    value={editedEvent.priority}
                    onChange={(e) => setEditedEvent({ ...editedEvent, priority: parseInt(e.target.value) })}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </select>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary me-2 col-6" onClick={handleSaveEvent}>Save</button>
                  <button className="btn btn-secondary col-6" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <p className="card-text">Start Date: {formatDate(event.start_date)}</p>
                <p className="card-text">End Date: {formatDate(event.end_date)}</p>
                <p className="card-text">Client Name: {event.client_name}</p>
                <p className="card-text">Client Email: {event.client_email}</p>
                <p className="card-text">Priority: <span className={`h5 ${getPriorityColor()}`}>{event.priority}</span></p>
                <p className="card-text">Added Time: {formatDate(event.added_time)}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          Loading...
        </div>
      )}
      {showConfirmation && (
        <div className="alert alert-warning" role="alert">
          Are you sure you want to delete this event?
          <button className="btn btn-danger mx-2" onClick={confirmDeleteEvent}>Yes</button>
          <button className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>Cancel</button>
        </div>
      )}
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          Event deleted successfully.
        </div>
      )}
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(); // Format the date and time as a string in a locale-specific way
};

export default EventDetails;
