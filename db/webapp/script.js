// Import required modules
const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const bodyParser = require('body-parser');


// Connect and Create an Express Application
const app = express();
const port = 3000; // By default, its 3000, you can customize

// Create a Postgres Connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'webapp',
    password: 'password', // Change to your password
    port: 5432, // Default Port
  });



app.use(express.static(path.join('')));


app.use(bodyParser.urlencoded({ extended: false }));

// Setup Route handler
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
  });

// Route handler for GET student data
app.get('/students', (req, res) => {
    const query = 'SELECT * FROM student;';
  
    pool.query(query, (error, result) => {
      if (error) {
        console.error('Error occurred:', error);
        res.status(500).send('An error occurred while retrieving data from the database.');
      } else {
        const students = result.rows;
        res.json(students);
      }
    });
  });

// Listening to Requests
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

