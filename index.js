const express = require('express');
const { connectDatabase } = require('./src/config/Database');
const Routes = require('./src/routes/Routes');
const cors = require('cors');
const dotenv= require('dotenv');
dotenv.config({path:'./config.env'});

const app = express();


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


connectDatabase();

// Use routes
app.use('/api', Routes);

// Start server
app.listen(3002, () => {
  console.log('Server running on port 3002');
});