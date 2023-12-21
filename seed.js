'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONN);

const Search = require('./Model/search');

async function seed(){
  const mySearch = new Search({
    timestamp: Date.now(),
    query: 'dogs',
    data: [['cat', 'cats.com', 'cats.com/cat.jpg', 'thecatsareabout']]
  });

  await mySearch.save()
    .then(() => console.log('Saved dog search to db'))
    .catch(err => console.error(err));

  await Search.create({
    timestamp: Date.now(),
    query: 'apples',
    data: [['apple computers', 'apple.com', '', 'We r dee best']]
  })
  .then(() => console.log('Saved apples search to db'))
  .catch(err => console.error(err));

    mongoose.disconnect();
}

seed();
