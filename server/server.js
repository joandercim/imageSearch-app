const express = require('express');
const router = require('./routes/router');
const cors = require('cors');
const dotenv = require('dotenv').config()

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use('/api/v1', router);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
