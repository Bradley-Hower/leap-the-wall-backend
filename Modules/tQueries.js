'use strict';

const axios = require('axios');
const cache = require('./cache');

function postTQuery(req, res, next){
  const tranquery =  `Translate ${req.query.tranquery} just to simplified mandarin, no pronunciation guide`;
  const key = 'Tqueries ' + tranquery;
  const url = 'https://api.openai.com/v1/chat/completions' 

  if (cache[key] && (Date.now() - cache[key].timestamp < 604800000)){
    console.log('Cache hit - pulling in cache data');
    res.status(200).send(cache[key].data);
  }
  else {
    console.log('Cache miss - submitting new request');
    axios.post(url, 
      {
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "user",
            "content": tranquery
          }
        ],
        "temperature": 0.7
      },
      {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + `${process.env.ChatGPT_CONN}`
      }
      })
      .then(response => response.data.choices.map(tdquery => new Chquery(tdquery)))
      .then(formattedData => {
        cache[key] = {};
        cache[key].data = formattedData;
        cache[key].timestamp = Date.now();
        res.status(200).send(formattedData);
      })
      .catch(err => next(err));
  }
}

class Chquery{
  constructor(translation){
    this.content = translation.message.content;
  }
}

module.exports = postTQuery;
