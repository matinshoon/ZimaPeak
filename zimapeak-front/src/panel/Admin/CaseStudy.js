import React, { useState } from 'react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('token');

function CaseStudyForm() {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        client: '',
        banner: '',
        logo: '',
        tags: '',
        challenge: '',
        solution: '',
        outcome: '',
        results: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await axios.post(
                `${baseUrl}/casestudies-make`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setSuccessMessage('Form submitted successfully.');
            setErrorMessage('');
            console.log(response.data); // Assuming you want to log the response
            // Optionally, you can redirect or show a success message here
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Error submitting form.');
            console.error('Error submitting form:', error);
            // Optionally, you can show an error message here
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
          <form onSubmit={handleSubmit}>
      
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                <label className="form-label">Title:</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
      
                <label className="form-label mt-3">Summary:</label>
                <textarea
                  className="form-control"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                ></textarea>
      
                <label className="form-label mt-3">Client:</label>
                <input
                  className="form-control"
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  required
                />
      
                <label className="form-label mt-3">Banner (URL or base64):</label>
                <input
                  className="form-control"
                  type="text"
                  name="banner"
                  value={formData.banner}
                  onChange={handleChange}
                  required
                />
      
                <label className="form-label mt-3">Logo (URL or base64):</label>
                <input
                  className="form-control"
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  required
                />
      
                <label className="form-label mt-3">Tags:</label>
                <input
                  className="form-control"
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  required
                />
              </div>
      
              {/* Right Column */}
              <div className="col-md-6">
                <label className="form-label">Challenge:</label>
                <textarea
                  className="form-control"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  required
                ></textarea>
      
                <label className="form-label mt-3">Solution:</label>
                <textarea
                  className="form-control"
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  required
                ></textarea>
      
                <label className="form-label mt-3">Outcome:</label>
                <textarea
                  className="form-control"
                  name="outcome"
                  value={formData.outcome}
                  onChange={handleChange}
                  required
                ></textarea>
      
                <label className="form-label mt-3">Results:</label>
                <textarea
                  className="form-control"
                  name="results"
                  value={formData.results}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
          </form>
        </div>
      );
      
}

export default CaseStudyForm;
