'use strict';

const axios = require('axios');
const cache = require('./cache');
const jsoninq = require('./sample.json');

function postTFinal(req, res, next){
  // postTFinal to be called with state string
  // const jsoninqst = JSON.stringify(jsoninq)
  const jsoninqst = JSON.stringify(req.query.tranquery.data.organic_results)
  const key = 'FinalT ' + jsoninqst;
  const url = 'https://translation.googleapis.com/language/translate/v2' 

  if (cache[key] && (Date.now() - cache[key].timestamp < 604800000)){
    console.log('Cache hit - pulling in cache data');
    res.status(200).send(cache[key].data);
  }
  else {
    console.log('Cache miss - submitting new request');
    axios.post(url, 
      {
        "q": [jsoninqst],
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
      .then(response => response.data.data.translations.map(finaltr => new FinalT(finaltr)))
      .then(formattedData => {
        cache[key] = {};
        cache[key].data = formattedData;
        cache[key].timestamp = Date.now();
        res.status(200).send(formattedData);
      })
      .catch(err => next(err));
  }
}

//Output needs to be parsed and outer quotes removed, replace double-quotes with single
class FinalT{
    constructor(translation){
      this.finaljson = translation.translatedText;
  }
}

module.exports = postTFinal;
