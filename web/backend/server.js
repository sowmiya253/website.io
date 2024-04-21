// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database_name'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Handle POST request to insert data into MySQL
app.post('/api/transfer', (req, res) => {
    const { sender, recipient, amount } = req.body;

    const sql = `INSERT INTO transfer (sender, recipient, amount) VALUES (?, ?, ?)`;
    db.query(sql, [sender, recipient, amount], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        console.log('Data inserted into MySQL');
        res.json({ success: true, message: 'Data inserted successfully' });
    });
});

// Handle GET request to fetch data from MySQL
app.get('/api/transactions', (req, res) => {
    const sql = `SELECT * FROM transfer`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }
        res.json({ success: true, transactions: results });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
