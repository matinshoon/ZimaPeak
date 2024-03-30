import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactsTable from '../components/ContactsTable';

const Contacts = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [manualAddSuccess, setManualAddSuccess] = useState(false);
  const [reloadTable, setReloadTable] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/data`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const handleSubmit = async () => {
    try {
      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      const user = localStorage.getItem('username'); // Retrieve logged-in user's name

      await axios.post(`${baseUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        params: {
          added_by: user // Pass logged-in user's name as a parameter
        }
      });

      setUploadSuccess(true);

      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);

      setReloadTable(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleManualSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const phone = e.target.elements.phone.value;
    const email = e.target.elements.email.value;
    const website = e.target.elements.website.value;
    const user = localStorage.getItem('username'); // Retrieve logged-in user's name

    try {
      await axios.post(`${baseUrl}/addcontact`, {
        Name: name,
        Phone: phone,
        Email: email,
        Website: website,
        added_by: user
      });

      setManualAddSuccess(true);
      setReloadTable(true);

      setTimeout(() => {
        setManualAddSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding contact manually:', error);
    }
  };

  useEffect(() => {
    async function fetchDataAndReloadTable() {
      await fetchData();
      setReloadTable(false);
    }
    fetchDataAndReloadTable();
  }, [reloadTable]);

  const toggleUploadFormVisibility = () => {
    setShowUploadForm(!showUploadForm);
  };

  return (
    <div className="container mt-5">
      <div className='d-flex col-12 w-full justify-content-center aligh-items-center'>
        <button className="btn link-primary" onClick={toggleUploadFormVisibility}>
          {showUploadForm ? "- Close" : "+ Add Contacts"}
        </button>
      </div>
      {showUploadForm && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header text-center">Upload .xlsx File</div>
              <div className="card-body d-flex flex-column justify-content-between align-items-center">
                <div className="form-group d-flex justify-content-center align-items-center">
                    <div className="custom-file">
                      <div class="input-group">
                        <input type="file" class="form-control" id="file" accept=".xlsx" onChange={handleFileChange}/>
                      </div>
                  </div>
                </div>
                <button className="btn btn-primary col-md-10" onClick={handleSubmit}>Upload</button>
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
              <div className="card-header text-center">Add Contacts Manually</div>
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
          <ContactsTable reloadTable={reloadTable} onEmailsSelected={() => { }} />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
