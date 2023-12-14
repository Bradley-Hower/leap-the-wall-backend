'use strict';

const axios = require('axios');
const cache = require('./cache');
const jsoninq = require('./sample.json');

function postTFinal(req, res, next){
  // jsoninq to be replaced with state string
  const jsoninqst = JSON.stringify(jsoninq)
  const htmlt = `Translate the Chinese characters to English in the following json and output as the same, as json - ${jsoninqst}`;
  const key = 'FinalT ' + htmlt;
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
            "content": htmlt
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
      .then(response => {
        const searchResult = new FinalT(response);
        res.status(200).send(searchResult);
      })
      .then(formattedData => {
        cache[key] = {};
        cache[key].data = formattedData;
        cache[key].timestamp = Date.now();
        res.status(200).send(formattedData);
      })
      .catch(err => next(err));
  }
}

class FinalT{
    constructor(obj){
      this.data = obj.data;
  }
}

module.exports = postTFinal;
