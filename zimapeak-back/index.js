const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const uuid = require('uuid'); 
const sgMail = require('@sendgrid/mail');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  port: '8889', // Update port if necessary
  user: 'root',
  password: 'root', // Change this to your MySQL root password
  database: 'test' // Change this to your database name
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

app.post('/register', (req, res) => {
  const { username, email, fullname, role, password } = req.body;

  // Check if username or email already exists in the database
  const checkQuery = 'SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?';
  db.query(checkQuery, [username, email], (checkErr, checkResult) => {
    if (checkErr) {
      res.status(500).json({ error: checkErr.message });
    } else {
      const { count } = checkResult[0];
      if (count > 0) {
        res.status(400).json({ error: 'Username or email already exists.' });
      } else {
        // Generate a unique ID for the user
        const id = uuid.v4();

        // Insert the new user into the database
        const insertQuery = 'INSERT INTO users (id, username, email, fullname, role, password) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertQuery, [id, username, email, fullname, role, password], (insertErr, insertResult) => {
          if (insertErr) {
            res.status(500).json({ error: insertErr.message });
          } else {
            res.status(200).json({ message: 'User registered successfully!' });
          }
        });
      }
    }
  });
});

// Login API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.length === 0) {
      res.status(401).json({ message: 'Invalid username or password' });
    } else {
      res.status(200).json({ message: 'Login successful!', user: result[0] });
    }
  });
});

// Fetch table data API
app.get('/data', (req, res) => {
  let sql = 'SELECT id, Name, Phone, Email, Website, status, date_added, emails_sent, Note FROM Contacts';

  // Check if filterOption and startDate query parameters are provided
  const { filterOption, status } = req.query;
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






// File upload configuration using multer
const upload = multer({ dest: 'uploads/' });

// API endpoint to handle file uploads and database insertion
app.post('/upload', upload.single('file'), (req, res) => {
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

app.post('/addContact', async (req, res) => {
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



app.put('/update', (req, res) => {
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
app.delete('/delete', (req, res) => {
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
sgMail.setApiKey('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');

app.post('/send-email', async (req, res) => {
  const { to, from, subject, message, footer } = req.body;

  if (!to || !from || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
  }

  // Split the 'to' field by commas to handle multiple email addresses
  const toAddresses = to.split(',').map(address => address.trim());

  try {
      // Iterate over each email address and send a separate email
      for (const address of toAddresses) {
          const msg = {
              to: address,
              from,
              subject,
              html: `${message}<br><br>${footer}` // Combine message and footer as HTML
          };
          await sgMail.send(msg);
      }

      return res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
      console.error('Error sending emails:', error);
      return res.status(500).json({ error: 'Failed to send emails' });
  }
});






app.put('/update-emails-sent', (req, res) => {
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





app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
