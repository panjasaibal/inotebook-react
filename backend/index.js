const connectToMongo = require('./db');
const express = require('express');

const port = 5000;
const app = express()
connectToMongo();


//avillable routers

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on localhost:${port}`)
  })