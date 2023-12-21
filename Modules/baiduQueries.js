'use strict'

const axios = require('axios');
// //REMOVE
// const baidutest = require('./baidutest.json');

function getBaidu(req, res, next){
  // //REMOVE - Beginning

  // const stringied = JSON.stringify(baidutest);
  // const rename_keys = (obj) => obj.replace(/“/g, '-');
  // const fixed = rename_keys(stringied);
  // const rename_keys2 = (obj) => obj.replace(/”/g, '-');
  // const fixed2 = rename_keys2(fixed);
  // const parsed = JSON.parse(fixed2);
  
  // let replied = new Baidusearch(parsed);
  // res.status(200).send(replied);
  // //REMOVE - End
  
  const engine = 'Baidu';
  const baiduquery = req.query.baiduquery;
  const pn = req.query.pn;
  const url = `https://serpapi.com/search.json?engine=${engine}&pn=${pn}&rn=30&q=${baiduquery}&api_key=${process.env.SERPAPI}`;

  axios.get(url)
    .then(response => {

      const somedata = response.data;
      // const stringied = JSON.stringify(somedata);
      // const rename_keys = (obj) => obj.replace(/“/g, '-');
      // const fixed = rename_keys(stringied);
      // const rename_keys2 = (obj) => obj.replace(/”/g, '-');
      // const fixed2 = rename_keys2(fixed);
      // const parsed = JSON.parse(fixed2);
      // console.log(parsed);

      const searchResult = new Baidusearch(somedata);
      return searchResult;
      // const baidureturn = parsed.data.data.translations.map(tdquery => new Baidusearch(tdquery))
    })
    .then(formattedData => res.status(200).send(JSON.stringify(formattedData)))
    .catch(err => next(err));
}

class Baidusearch{
  constructor(obj){
    this.baidudata = obj;
    // this.baidudata = obj;
  }
}

module.exports = getBaidu;
