const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse URL-encoded data
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

// Check if all fields are provided
if (!name || !email || !message) {
     return res.status(400).send('All fields are required');
}

    // Append data to contacts.txt
    const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;
    fs.appendFile('contacts.txt', data, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Message not sent.');
        } else {
            res.status(200).send('Message sent successfully.');
        }
    })
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});