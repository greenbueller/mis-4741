// Import all required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const moment = require('moment');

// Create the Express app
const app = express();
const port = process.env.PORT || 3000;

// Import the dotenv package so I can use a .env file (NOT STORED ON THE REPO)
require('dotenv').config();

// Body Parser and Cookie Parser middleware for future referencing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Handle the website display and routing */

app.use(express.static(path.join(__dirname, 'dist')));

/* -- Static Files --  */
app.use('/media', express.static(path.join(__dirname, 'public', 'media')));

/* -- Robots.txt for Lighthouse -- */
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(__dirname, 'robots.txt'));
});

// This was originally one big option, but it broke the code above this that prevented non-logged in users from accessing protected pages.
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

/* -- Update the root directory based on if the user is logged in or not. -- */
app.get('/', (req, res) => {
    return res.redirect('/home');
});

/* Handle all things tasks */
app.post('/submit', (req, res) => {
    const { temp } = req.body;

    console.log('Data entered: ', temp);
    
    return res.status(200).json({ status: 'success', message: 'Data received.' });
});

app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

// Start the server and inform the console of the port it is running on.
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});