require('dotenv').config()
const express = require('express')
const connectToMongo = require('./db');
const cors = require('cors')
const auth = require('./routes/auth');
const cars = require('./routes/cars')

connectToMongo();

const app = express()
const port = 5000


app.use(cors())
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', auth);
app.use('/api/cars', cars);


app.listen(port, () => {
  console.log(`Easy Rent backend listening on port ${port}`)
})