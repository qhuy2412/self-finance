require("dotenv").config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//Import routes
const authRoute = require("./routes/authRoute")

const db = require('./config/db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth',authRoute);

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;