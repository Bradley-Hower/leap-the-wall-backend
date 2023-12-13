'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const postTQuery = require('./Modules/TQueries')
const searchHandler = require('./Modules/searchHandler')

const getTQuery = require('./Modules/TQueries')

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

// mongoose.connect(process.env.MONGODB_CONN);

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'Database connection error'));
// db.once('open', () => console.log('Database is connected'));

app.get(('/', (req, res, next) => res.status(200).send('Default route working')));

//POST request for Translated Query from ChatGPT
app.post('/tquery', postTQuery);

//Communication with MongoDB for past searches
// app.get('/searches', searchHandler.getSearches);
// app.post('/searches', searchHandler.postSearch);
// app.put('/searches/:id', searchHandler.updateSearch);
// app.delete('/books/:id', searchHandler.deleteSearch);

app.get(('*', (req, res, next) => res.status(404).send('Resource not found')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
