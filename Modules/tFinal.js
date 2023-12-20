'use strict';

const axios = require('axios');
const cache = require('./cache');
// const jsoninq = require('./baidutest2.json');

function postTFinal(req, res, next){
  // //REMOVE - beginning
  // const stringied = JSON.stringify(jsoninq);
  // const rename_keys = (obj) => obj.replace(/(" )/g, '"');
  // const fixed_keys = rename_keys(stringied);
  // const parsed = JSON.parse(fixed_keys)
  // let replied = parsed.map(output => new FinalT(output));
  // let toparse = replied[0].finaljson
  // res.status(200).send(toparse);
  // //REMOVE - end

  const jsoninqst = JSON.stringify(req.query.qs);
  console.log(jsoninqst);

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
      .then(response => {
        const somedata = response.data
        // const stringied = JSON.stringify(somedata);
        // const rename_keys = (obj) => obj.replace(/(\" )/g, '"');
        // const fixed_keys = rename_keys(stringied);
        // const parsed = JSON.parse(fixed_keys);
        const final = somedata.data.translations.map(tdquery => new FinalT(tdquery))
        return final})
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
      // this.finaljson = translation.finaljson;
      this.finaljson = translation.translatedText;
  }
}

module.exports = postTFinal;
