require("dotenv").config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const db = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('api/health', (req, res) => {
    res.send({message: 'API is healthy!'});
});

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;