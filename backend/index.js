require('dotenv').config()
const express = require('express')
const connectToMongo = require('./db');
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5000


app.use(cors())
app.use(express.json());

// Routes
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/cars', require('./routes/cars'));


app.listen(port, () => {
  console.log(`Easy Rent backend listening on port ${port}`)
})