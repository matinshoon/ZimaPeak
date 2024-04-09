import React, { useState } from 'react';
import axios from 'axios';
import ContactsTable from '../components/ContactsTable';
import { useSelector } from 'react-redux';

const Compose = () => {
    const loggedInEmail = useSelector(state => state.auth.email);
    const loggedInUser = useSelector(state => state.auth.fullname);
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        message: ''
    });
    const [selectedContacts, setSelectedContacts] = useState([]);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem('token');

    const handleInputChange = (e) => {
        setEmailData({ ...emailData, [e.target.name]: e.target.value });
    };

    const handleEmailsSelected = (selectedIdsOrEmails) => {
        // Extract emails and IDs separately
        const selectedEmails = [];
        const selectedIds = [];

        selectedIdsOrEmails.forEach(item => {
            if (typeof item === 'object') {
                selectedEmails.push(item.email);
                selectedIds.push(item.id);
            } else {
                selectedEmails.push(item);
            }
        });

        // Update selectedContacts state
        setSelectedContacts(selectedIds);

        // Update "To" field with selected emails separated by commas
        const emailsString = selectedEmails.join(', ');
        setEmailData({ ...emailData, to: emailsString });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Extract email addresses from the to field
            const validToEmails = emailData.to.split(',').map(email => email.trim());

            // Check if any contacts are selected
            if (validToEmails.length === 0 || validToEmails.includes('')) {
                alert('No contacts selected. Please select contacts before sending the email.');
                return;
            }

            // Construct email message with footer
            const emailFooter = `
                <br><br><a href="https://calendly.com/zimapeak_audit/30min" style="background-color: #28a745; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 5px; display: inline-block; margin-top: 20px; margin-bottom: 50px;">Let's have a chat!</a>
                <div style="display: flex;">
                    <div style="display: flex; justify-content: center; align-items: center; border-right: #000 solid 2px; margin-right: 10px;">
                        <img src="https://zimapeak.com/images/logo-blue.png" style="height: 100px;">
                    </div>
                    <div>
                        <p>Best regards,</p>
                        <p>${loggedInUser} | <span><a href="https://zimapeak.com/">ZimaPeak</a></span></p>
                        <p>+1 (647) 570-2244</p>
                        <p>Toronto, ON</p>
                    </div>
                </div>
            `;

            const formData = {
                to: validToEmails.join(', '), // Pass recipient email addresses as a single string
                subject: emailData.subject,
                message: emailData.message.replace(/\n/g, '<br>'), // Replace newline characters with <br> tags
                footer: emailFooter,
                from: loggedInEmail
            };

            // Send the POST request with form data
            const response = await axios.post(`${baseUrl}/send-email`, formData, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in the request headers
                }
            });
            

            // Check if the response contains any error messages
            if (response.data.error) {
                throw new Error(response.data.error);
            }

            // If the email was sent successfully, update emails_sent for selected contacts
            await handleUpdateEmailsSent(selectedContacts);

            // Alert after sending email and updating emails_sent
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        }
    };



    const handleUpdateEmailsSent = async (ids) => {
        try {
            if (ids.length > 0) {
                // Increment emails_sent for selected contacts
                await axios.put(`${baseUrl}/update-emails-sent`, {
                    ids: ids,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in the request headers
                    }
                });
            }
        } catch (error) {
            console.error('Error updating emails_sent:', error);
        }
    };
    

    return (
        <div className="container-fluid full-height">
            <div className="row justify-content-center h-100">
                <div className="col-md-5 my-2">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="to">To:</label>
                                <input type="text" className="form-control" id="to" name="to" placeholder="Enter recipient email" value={emailData.to} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject:</label>
                                <input type="text" className="form-control" id="subject" name="subject" placeholder="Enter email subject" value={emailData.subject} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message:</label>
                                <textarea className="form-control" id="message" name="message" rows="27" placeholder="Enter your message" value={emailData.message} onChange={handleInputChange} required></textarea>
                            </div>
                            <button type="submit" className="mt-3 col-12 btn btn-primary">Send</button>
                        </form>
                    </div>
                </div>
                {/* Right side */}
                <div className="col-md-7 border-start p-4" style={{ maxHeight: '95vh', overflowY: 'auto' }}>
                    <ContactsTable onEmailsSelected={handleEmailsSelected} />
                </div>

            </div>
        </div>
    );
};

export default Compose;
