import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactsTable from '../components/ContactsTable';

const Contacts = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [manualAddSuccess, setManualAddSuccess] = useState(false); // State to track manual add success
  const [reloadTable, setReloadTable] = useState(false); // State to trigger table reload
  const [showUploadForm, setShowUploadForm] = useState(false); // State to control the visibility of the upload form

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(false); // Reset upload success state when a new file is selected
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Return empty array if there's an error
    }
  };

  const handleSubmit = async () => {
    try {
      if (!file) {
        return; // No file selected
      }

      const formData = new FormData();
      formData.append('file', file);

      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadSuccess(true); // Set upload success state to true after successful upload

      setTimeout(() => {
        setUploadSuccess(false); // Reset upload success state after 3 seconds
      }, 3000); // 3000 milliseconds = 3 seconds

      setReloadTable(true); // Trigger table reload after successful upload
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const name = e.target.elements.name.value;
    const phone = e.target.elements.phone.value;
    const email = e.target.elements.email.value;
    const website = e.target.elements.website.value;

    try {
      await axios.post('http://localhost:3000/addcontact', {
        Name: name,
        Phone: phone,
        Email: email,
        Website: website
      });

      // Show manual add success message
      setManualAddSuccess(true);

      // Reload the table after successful submission
      setReloadTable(true);

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setManualAddSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding contact manually:', error);
    }
  };

  // Fetch data on component mount and when reloadTable state changes
  useEffect(() => {
    async function fetchDataAndReloadTable() {
      await fetchData();
      setReloadTable(false);
    }
    fetchDataAndReloadTable();
  }, [reloadTable]);

  // Function to toggle visibility of upload form
  const toggleUploadFormVisibility = () => {
    setShowUploadForm(!showUploadForm);
  };

  return (
    <div className="container mt-5">
      <div className='d-flex col-12 w-full justify-content-center aligh-items-center'>
      <button className="btn link-primary" onClick={toggleUploadFormVisibility}>
            {showUploadForm ? "Contatcs Added" : "+ Add Contacts"}
          </button>
      </div>
      {showUploadForm && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Upload Google Sheet Data</div>
              <div className="card-body">
                <div className="form-group d-flex align-items-center">
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={handleSubmit}>Upload</button>
                </div>
                {uploadSuccess && (
                  <div className="alert alert-success" role="alert">
                    Data successfully uploaded!
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Add Contacts Manually</div>
              <div className="row justify-content-center">
                <div className="col-md-10 my-3">
                  <form onSubmit={handleManualSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name:</label>
                      <input type="text" className="form-control" id="name" name="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone:</label>
                      <input type="text" className="form-control" id="phone" name="phone" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input type="email" className="form-control" id="email" name="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="website">Website:</label>
                      <input type="text" className="form-control" id="website" name="website" />
                    </div>
                    <button className="btn btn-primary col-12 mt-3">Add</button>
                  </form>
                  {manualAddSuccess && (
        <div className="mt-3">
          <div className="alert alert-success" role="alert">
            Contact added successfully!
          </div>
        </div>
      )}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
      <div className="mt-5">
        <div className="col-12">
        <ContactsTable reloadTable={reloadTable} onEmailsSelected={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
