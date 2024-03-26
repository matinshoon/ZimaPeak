const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const uuid = require('uuid'); 
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection local
const db = mysql.createConnection({
  host: 'localhost',
  port: '8889', // Update port if necessary
  user: 'root',
  password: 'root', // Change this to your MySQL root password
  database: 'test' // Change this to your database name
});

// MySQL Connection main
// const db = mysql.createConnection({
//   host: 'localhost',
//   port: '3306',
//   user: 'zimalxqv_panelAdmin',
//   password: '9010mr9010@forca_mE', 
//   database: 'zimalxqv_panel'
// });

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

app.get('/api', (req, res) => {
  res.send('Hello dev!')
})

app.post('/api/register', (req, res) => {
  const { username, email, fullname, role, password } = req.body;

  // Check if username or email already exists in the database
  const checkQuery = 'SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?';
  db.query(checkQuery, [username, email], async (checkErr, checkResult) => {
    if (checkErr) {
      res.status(500).json({ error: checkErr.message });
    } else {
      const { count } = checkResult[0];
      if (count > 0) {
        res.status(400).json({ error: 'Username or email already exists.' });
      } else {
        try {
          // Generate a unique ID for the user
          const id = uuid.v4();

          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

          // Insert the new user into the database
          const insertQuery = 'INSERT INTO users (id, username, email, fullname, role, password) VALUES (?, ?, ?, ?, ?, ?)';
          db.query(insertQuery, [id, username, email, fullname, role, hashedPassword], (insertErr, insertResult) => {
            if (insertErr) {
              res.status(500).json({ error: insertErr.message });
            } else {
              res.status(200).json({ message: 'User registered successfully!' });
            }
          });
        } catch (hashErr) {
          res.status(500).json({ error: hashErr.message });
        }
      }
    }
  });
});

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?'; // No need to check password here
  db.query(sql, [username], async (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(401).json({ message: 'Invalid username or password' });
    } else {
      // Compare the provided password with the hashed password from the database
      try {
        const match = await bcrypt.compare(password, result[0].password);
        if (match) {
          if (result[0].state !== 'active') {
            res.status(401).json({ message: 'User is not active' });
          } else {
            res.status(200).json({ message: 'Login successful!', user: result[0] });
          }
        } else {
          res.status(401).json({ message: 'Invalid username or password' });
        }
      } catch (compareErr) {
        res.status(500).json({ error: compareErr.message });
      }
    }
  });
});



// Fetch table data API
app.get('/api/data', (req, res) => {
  let sql = 'SELECT id, Name, Phone, Email, Website, status, DATE(date_added) AS date_added, emails_sent, Note FROM Contacts';

  // Check if filterOption, status, or date_added query parameters are provided
  const { filterOption, status, date_added } = req.query;
  let whereClause = '';

  if (filterOption) {
    let filterCondition = '';
    switch (filterOption) {
      case 'lastHour':
        filterCondition = `date_added >= NOW() - INTERVAL 1 HOUR`;
        break;
      case 'lastDay':
        filterCondition = `date_added >= NOW() - INTERVAL 1 DAY`;
        break;
      case 'lastWeek':
        filterCondition = `date_added >= NOW() - INTERVAL 1 WEEK`;
        break;
      case 'lastMonth':
        filterCondition = `date_added >= NOW() - INTERVAL 1 MONTH`;
        break;
      default:
        break;
    }

    if (filterCondition) {
      whereClause = `WHERE ${filterCondition}`;
    }
  }

  if (status) {
    if (whereClause) {
      whereClause += ` AND status = '${status}'`;
    } else {
      whereClause = `WHERE status = '${status}'`;
    }
  }

  if (date_added) {
    if (whereClause) {
      whereClause += ` AND DATE(date_added) = '${date_added}'`;
    } else {
      whereClause = `WHERE DATE(date_added) = '${date_added}'`;
    }
  }

  if (whereClause) {
    sql += ` ${whereClause}`;
  }

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(result);
    }
  });
});



app.get('/api/users/status', (req, res) => {
  const userId = req.query.id;

  // If the id parameter is provided, fetch the status of a single entity
  if (userId) {
      const sql = 'SELECT status FROM users WHERE id = ?';
      db.query(sql, [userId], (err, result) => {
          if (err) {
              console.error('Error fetching status:', err.message);
              res.status(500).json({ error: 'Error fetching status' });
          } else {
              if (result.length === 0) {
                  res.status(404).json({ error: 'User not found' });
              } else {
                  res.status(200).json({ id: userId, status: result[0].status });
              }
          }
      });
  } else {
      // If no id parameter is provided, fetch the status of all entities
      const sql = 'SELECT id, fullname, status FROM users';
      db.query(sql, (err, result) => {
          if (err) {
              console.error('Error fetching status:', err.message);
              res.status(500).json({ error: 'Error fetching status' });
          } else {
              const usersStatus = result.map(row => ({
                  id: row.id,
                  fullname: row.fullname,
                  status: row.status
              }));
              res.status(200).json(usersStatus);
          }
      });
  }
});





// File upload configuration using multer
const upload = multer({ dest: 'uploads/' });

// API endpoint to handle file uploads and database insertion
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    let data = xlsx.utils.sheet_to_json(worksheet);

    console.log('Data from Excel:', data); // Log the data here

    if (data.length === 0) {
      return res.status(400).json({ error: 'No data found in the Excel file' });
    }

    // Generate unique IDs for each item
    data = data.map(item => ({ ...item, id: uuid.v4(), status: 'active' }));

    const placeholders = data.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');
    const sql = `INSERT INTO Contacts (id, Name, Phone, Email, Website, status) VALUES ${placeholders}`;
    const values = data.flatMap(row => [row.id, row.Name, row.Phone, row.Email, row.Website, row.status]);    

    console.log('Generated SQL:', sql); // Log the SQL query here
    console.log('Values:', values);

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data into database:', err.message);
        return res.status(500).json({ error: 'Error inserting data into database', details: err.message });
      } else {
        console.log('Data inserted successfully');
        return res.status(200).json({ message: 'Data inserted successfully' });
      }
    });
  } catch (error) {
    console.error('Error processing file upload:', error.message);
    return res.status(500).json({ error: 'Error processing file upload', details: error.message });
  } finally {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
  }
});

app.post('/api/addContact', async (req, res) => {
  try {
      // Extract parameters from the request body
      const { Name, Phone, Email, Website } = req.body;

      // Generate a unique ID for the contact
      const id = uuid.v4();

      // Insert the new contact into the database
      const result = await db.query('INSERT INTO Contacts (id, Name, Phone, Email, Website, status) VALUES (?, ?, ?, ?, ?, ?)', [id, Name, Phone, Email, Website, 'active']);

      // Respond with success message
      res.json({ success: true, message: 'Contact added successfully' });
  } catch (error) {
      // If an error occurs, respond with an error message
      console.error('Error adding contact:', error);
      res.status(500).json({ success: false, message: 'Error adding contact' });
  }
});



app.put('/api/update', (req, res) => {
  try {
    const { ids, Note, ...updates } = req.body;

    if (!ids || (Object.keys(updates).length === 0 && Note === undefined)) {
      return res.status(400).json({ error: 'IDs or updates are required' });
    }

    let sql = 'UPDATE Contacts SET ';
    const values = [];

    // Construct the SET clause dynamically based on the updates object
    Object.keys(updates).forEach((key, index) => {
      if (index > 0) {
        sql += ', ';
      }
      sql += `${key} = ?`;
      values.push(updates[key]);
    });

    // Add Note to SET clause if it's provided in the request body
    if (Note !== undefined) {
      if (Object.keys(updates).length > 0) {
        sql += ', ';
      }
      sql += `Note = ?`;
      values.push(Note);
    }

    sql += ' WHERE id IN (?)';
    values.push(ids);

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating entries:', err.message);
        return res.status(500).json({ error: 'Error updating entries', details: err.message });
      } else {
        console.log('Entries updated successfully');
        return res.status(200).json({ message: 'Entries updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error updating entries:', error.message);
    return res.status(500).json({ error: 'Error updating entries', details: error.message });
  }
});






// Delete API
app.delete('/api/delete', (req, res) => {
  const ids = req.body.ids;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Invalid IDs provided' });
  }

  const sql = 'DELETE FROM Contacts WHERE id IN (?)';
  db.query(sql, [ids], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Entries deleted successfully' });
    }
  });
});

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/send-email', async (req, res) => {
  const { to, from, subject, message, footer } = req.body;

  if (!to || !from || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
  }

  // Parse the 'to' field into an array if it's provided as a comma-separated string
  const toAddresses = Array.isArray(to) ? to : to.split(',').map(email => email.trim());

  try {
      // Iterate over each recipient and send individual emails
      for (const address of toAddresses) {
          const msg = {
              to: address,
              from,
              subject,
              html: `${message}<br><br>${footer}`
          };

          // Send the individual email
          await sgMail.send(msg);
      }

      // Save sent email to the database
      await saveSentEmailToDatabase(toAddresses, from, subject, message, footer);

      return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
      console.error('Error sending emails:', error);
      return res.status(500).json({ error: 'Failed to send emails' });
  }
});

async function saveSentEmailToDatabase(to, from, subject, message, footer) {
  const sentAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format the timestamp
  const emailId = uuid.v4(); // Generate UUID

  // Join the array of recipient email addresses with a comma
  const toEmailString = to.join(', ');

  const sql = 'INSERT INTO sent_emails (id, to_email, from_email, subject, message, footer, sent_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [emailId, toEmailString, from, subject, message, footer, sentAt];

  return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
          if (err) {
              console.error('Error saving sent email to database:', err);
              reject(err);
          } else {
              console.log('Sent email saved to database successfully');
              resolve(result);
          }
      });
  });
}



app.put('/api/update-emails-sent', (req, res) => {
  try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids)) {
          return res.status(400).json({ error: 'IDs array is required' });
      }

      // Increment emails_sent by 1 for all specified IDs
      const sql = 'UPDATE Contacts SET emails_sent = emails_sent + 1 WHERE id IN (?)';
      const values = [ids];

      db.query(sql, values, (err, result) => {
          if (err) {
              console.error('Error updating emails_sent:', err.message);
              return res.status(500).json({ error: 'Error updating emails_sent', details: err.message });
          } else {
              console.log('Emails_sent updated successfully');
              return res.status(200).json({ message: 'Emails_sent updated successfully' });
          }
      });
  } catch (error) {
      console.error('Error updating emails_sent:', error.message);
      return res.status(500).json({ error: 'Error updating emails_sent', details: error.message });
  }
});


// Define an object to store user statuses
app.put('/api/users/updateStatus', (req, res) => {
  const userId = req.query.id;
  const newData = req.body;

  if (!userId || !newData) {
    return res.status(400).json({ message: 'Missing required parameters.' });
  }

  // Construct the SET clause of the SQL query dynamically based on the provided parameters
  let setClause = '';
  const values = [];

  Object.keys(newData).forEach(key => {
    // Append each field to the SET clause
    setClause += `${key} = ?, `;
    values.push(newData[key]);
  });

  // Remove the trailing comma and space
  setClause = setClause.slice(0, -2);

  // Update the user in the database
  const sql = `UPDATE users SET ${setClause} WHERE id = ?`;
  const queryParams = [...values, userId];

  db.query(sql, queryParams, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ message: 'Error updating user.' });
    }
    console.log('User updated successfully');
    return res.status(200).json({ message: 'User updated successfully.' });
  });
});



app.get('/api/users', (req, res) => {
  // Query the database to get all users
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error fetching users:', err);
          res.status(500).json({ error: 'Error fetching users' });
      } else {
          // Return the fetched users as JSON response
          res.json(result);
      }
  });
});

// SendGrid event webhook notifications
app.post('/api/sendgrid/webhook', (req, res) => {
  const events = req.body;

  if (!events || !Array.isArray(events)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    events.forEach(event => {
      saveEventToDatabase(event);
    });
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing webhook events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to save event data to the database
function saveEventToDatabase(event) {
  const { email, timestamp, event: eventType, sg_event_id, sg_message_id, ...payload } = event;

  // Convert timestamp to MySQL datetime format
  const mysqlTimestamp = new Date(timestamp * 1000).toISOString().slice(0, 19).replace('T', ' ');

  const sql = 'INSERT INTO sendgrid_events (email, timestamp, event_type, sg_event_id, sg_message_id, payload) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [email, mysqlTimestamp, eventType, sg_event_id, sg_message_id, JSON.stringify(payload)];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error saving event to database:', err);
    } else {
      console.log('Event saved to database successfully');
    }
  });
}


app.get('/api/sendgrid-events', (req, res) => {
  // Query the database to get all users
  const sql = 'SELECT * FROM sendgrid_events';
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error fetching users:', err);
          res.status(500).json({ error: 'Error fetching users' });
      } else {
          // Return the fetched users as JSON response
          res.json(result);
      }
  });
});



app.get('/api/get-sent-emails', async (req, res) => {
  try {
    // Query the database to retrieve sent emails
    const query = 'SELECT * FROM sent_emails';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching sent emails:', err);
        return res.status(500).json({ error: 'Failed to fetch sent emails' });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error('Error fetching sent emails:', error);
    return res.status(500).json({ error: 'Failed to fetch sent emails' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
