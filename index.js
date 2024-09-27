const express = require('express');
const { connectDatabase } = require('./src/config/Database');
const Routes = require('./src/routes/Routes');
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3002


connectDatabase();

app.use('/api', Routes);

app.listen(PORT, () => {
  console.log('Server running on port 3002');
});

