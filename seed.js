'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONN);

const Search = require('./Model/search');

async function seed(){
  const myBook = new Search({
    title: 'Fahrenheit 451',
    description: 'Read and then burn.',
    status: 'Available'
  });

  await myBook.save()
    .then(() => console.log('Saved Fahrenheit 451 to database'))
    .catch(err => console.error(err));

    mongoose.disconnect();
}

seed();
