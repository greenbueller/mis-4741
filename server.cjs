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

/* -- Prevent user from accessing protected pages if not logged in -- */
app.use((req, res, next) => {
    // Anything that can be publicly accessed, such as registration/login pages and the associated endpoints, as well as static files
    const publicEndpoints = ['/form', '/robots.txt', '/submit'];
    const staticElements = req.path.startsWith('/css') || req.path.startsWith('/assets') || req.path === '/vite.svg';
    // If the request is for one of these, pass the user through.
    if (publicEndpoints.includes(req.path) || staticElements ) {
        return next();
    }
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
app.post('/submit', async (req, res) => {
    const { temp } = req.body;

    console.log('Data entered: ', temp);
    
    return res.status(200).json({ status: 'success', message: 'Data received.' });
});
/*
    // User must be authenticated to add a task.
    if (!req.cookies.auth || req.cookies.auth !== 'true' || !req.cookies.email) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    // Get the user's email from the cookie
    const email = req.cookies.email;
    // Get the task details from the request body
    const { taskName, taskDescription, taskDueDate, taskPriority } = req.body;
    // If any are missing, return a 400 bad request error.
    if (!taskName || !taskDescription || !taskDueDate || !taskPriority) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    // Otherwise, store the request body as a constant to pass into the database.
    const task = {
        email, taskName, taskDescription, taskDueDate, taskPriority, completed: false
    };
    // Attempt to insert the task into the database.
    const result = await tasksCollection.insertOne(task);
    // If the insertion was successful, return a 201 created response.
    if (result.acknowledged) {
        res.status(201).json({ status: 'success', message: 'Task added successfully.' });
    } else {
        // Otherwise, return a 500 internal server error.
        res.status(500).json({ status: 'error', message: 'Failed to add task.' });
    }
});
*/

app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

// Start the server and inform the console of the port it is running on.
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});