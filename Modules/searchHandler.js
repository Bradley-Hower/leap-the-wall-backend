'use strict';

const Search = require('../Model/search')

const searchHandler = {};

searchHandler.getSearches = function(req, res, next){
  
  Search.find(query)
    .then(data => res.status(200).send(data))
    .catch(err => next(err));
}

searchHandler.postSearch = function(req, res, next){
  Search.create({...req.body, email: req.user.email})
    .then(createdSearch => res.status(201).send(createdSearch))
    .catch(err => next(err));
}

searchHandler.updateSearch = function(req, res, next){
  const {id} = req.params;
  const data = req.body;

  Search.findByIdAndUpdate(id, data, {new: true, overwrite: true})
    .then(updatedSearch => res.status(202).send(updatedSearch))
    .catch(err => next(err));
}

searchHandler.deleteSearch = function(req, res, next){
  const {id} = req.params;

  Search.findByIdAndDelete(id)
    .then(deleteSearch => res.status(202).send(deletedSearch))
    .catch(err => next(err));
}

module.exports = searchHandler;