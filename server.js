const express = require('express');
const db = require('./config/keys');
const mongoose = require('mongoose');
const productRoutes = require('./routes');
require('dotenv').config();

//Constants
const PORT = 8080;
const HOST = '0.0.0.0';

//APP
const app = express();

mongoose
  .connect(db.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((error) => console.log(error));

app.use('/api/products/', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;
