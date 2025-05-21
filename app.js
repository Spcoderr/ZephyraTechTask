
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
connectDB();
const authRoutes = require('./routes/auth.routes');


app.use(cors());
app.use(express.urlencoded({
     extended: true,

 }));
app.use(express.json());
app.use('/api/auth', authRoutes); 


module.exports = app;

