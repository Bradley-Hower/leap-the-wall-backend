'use strict';

const Search = require('../Model/search')

const searchHandler = {};

searchHandler.getSearches = function(req, res, next){

  Search.find(query)
    .then(data => res.status(200).send(data))
    .catch(err => next(err));
}

searchHandler.postSearch = function(req, res, next){
  Search.create({...req.body})
    .then(createdSearch => res.status(201).send(createdSearch))
    .catch(err => next(err));
}

searchHandler.deleteSearch = function(req, res, next){
  const {id} = req.params;

  Search.findByIdAndDelete(id)
    .then(deleteSearch => res.status(202).send(deleteSearch))
    .catch(err => next(err));
}

module.exports = searchHandler;
