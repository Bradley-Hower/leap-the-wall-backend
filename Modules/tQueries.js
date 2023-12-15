'use strict';

const axios = require('axios');
const cache = require('./cache');

function postTQuery(req, res, next){
    // postTQuery to be called with state string
  const tranquery =  req.query.tranquery;
  const key = 'Tqueries ' + tranquery;
  const url = 'https://translation.googleapis.com/language/translate/v2';

  if (cache[key] && (Date.now() - cache[key].timestamp < 604800000)){
    console.log('Cache hit - pulling in cache data');
    res.status(200).send(cache[key].data);
  }
  else {
    console.log('Cache miss - submitting new request');
    axios.post(url, 
      {
        "q": [tranquery],
        "source": "zh-CN",
        "target": "en",
        "format": "text"
      }
      ,
      {
      headers: {
        'Authorization': 'Bearer ' + `${process.env.GCLOUD}`,
        'x-goog-user-project': `${process.env.GOOGLE_PROJECT_ID}`,
        'Content-Type': 'application/json; charset=utf-8'
      }
      })
      .then(response => response.data.data.translations.map(tdquery => new Chquery(tdquery)))
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
    this.query = translation.translatedText;
  }
}

module.exports = postTQuery;
