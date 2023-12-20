'use strict';

const axios = require('axios');
const cache = require('./cache');
// //REMOVE
// const querytest = require('./querytest.json');

function postTQuery(req, res, next){
  // //REMOVE - beginning
  // let replied = new Chquery(querytest);
  
  // res.status(200).send(replied);

  // //REMOVE - end

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
        "source": "en",
        "target": "zh-CN",
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
    // //REMOVE - beginning
    // this.query = translation;
    // //REMOVE - end
    this.query = translation.translatedText;
  }
}

module.exports = postTQuery;
