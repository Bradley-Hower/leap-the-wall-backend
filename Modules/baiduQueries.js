'use strict'

const axios = require('axios');

function getBaidu(req, res, next){
    // engine to be replaced with state string
  const engine = 'baidu';
  // query to be replaced with state string
  const baiduquery = '苹果';
  const api_key = req.query.api_key;
  const url = `https://serpapi.com/search.json?engine=${engine}&q=${baiduquery}&api_key=${api_key}`;

  axios.get(url)
    .then(response => {
      const searchResult = new Baidusearch(response);
      res.status(200).send(searchResult);
    })
    .catch(err => next(err));
}

class Baidusearch{
  constructor(obj){
    this.data = obj.data;
  }
}

module.exports = getBaidu;
