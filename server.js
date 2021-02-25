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

app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//Error Handler middleware
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

// app.listen(PORT);
// console.log(`Running on port ${PORT}`)

module.exports = app;
