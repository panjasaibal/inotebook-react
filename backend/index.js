const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

const port = 5000;
const app = express()
app.use(cors())


connectToMongo();


//avillable routers

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
  })
  
  app.listen(port, () => {
    console.log(`Inotebook backend app listening on localhost:${port}`);
  })