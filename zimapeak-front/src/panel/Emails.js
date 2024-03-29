import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';

const Emails = () => {
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(25);
  const [expandedEmailIndex, setExpandedEmailIndex] = useState(null);
  const maxEmailLength = 50; // Maximum length of the email to display
  const maxMessageLength = 100; // Maximum length of the message to display
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      // Calculate the date 60 days ago
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 60);
      const formattedDate = pastDate.toISOString().split('T')[0]; // Get the date in 'YYYY-MM-DD' format
  
      // Make a GET request to fetch emails since the past 60 days
      const response = await axios.get(`${baseUrl}/get-sent-emails?date=${formattedDate}`);
      setEmails(response.data);
    } catch (error) {
      console.error('Error fetching sent emails:', error);
    }
  };
  

  // Get current emails
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleExpandEmail = (index) => {
    setExpandedEmailIndex(expandedEmailIndex === index ? null : index);
  };

  const renderContentWithExpansion = (content, maxLength, index) => {
    if (expandedEmailIndex === null || expandedEmailIndex !== index) {
      return content.length > maxLength
        ? `${content.slice(0, maxLength)}...`
        : content;
    } else {
      return content;
    }
  };

  // Calculate pagination range
  const pageNumbers = [];
  const maxPagesToShow = 10;
  const totalPages = Math.ceil(emails.length / emailsPerPage);
  let startPage = Math.max(1, currentPage - 5);
  let endPage = Math.min(totalPages, currentPage + 5);

  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <h1 className="mt-4 mb-4">Sent Emails</h1>
      <Table striped hover>
        <thead>
          <tr>
            <th>To</th>
            <th>From</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Sent At</th>
          </tr>
        </thead>
        <tbody>
          {currentEmails.map((email, index) => (
            <tr key={email.id}>
              <td>
                {renderContentWithExpansion(email.to_email, maxEmailLength, email.id)}
                {email.to_email.length > maxEmailLength && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => toggleExpandEmail(email.id)}
                  >
                    {expandedEmailIndex === email.id ? '-' : '+'}
                  </Button>
                )}
              </td>
              <td>{email.from_email}</td>
              <td>{email.subject}</td>
              <td>
                {renderContentWithExpansion(email.message, maxMessageLength, email.id)}
                {email.message.length > maxMessageLength && (
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => toggleExpandEmail(email.id)}
                  >
                    {expandedEmailIndex === email.id ? '-' : '+'}
                  </Button>
                )}
              </td>
              <td>{new Date(email.sent_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Button onClick={() => paginate(1)} className="page-link">First</Button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <Button onClick={() => paginate(number)} className="page-link mx-2">
              {number}
            </Button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <Button onClick={() => paginate(totalPages)} className="page-link">Last</Button>
        </li>
      </ul>
    </Container>
  );
};

export default Emails;
