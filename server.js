'use strict';
const { PORT } = require('./config');

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');
const { logger } = require('./middleware/logger');
const app = express();

app.use(express.static('public'));
app.use(logger);

app.get('/api/notes', (req, res) => {
    const searchTerm = req.query.searchTerm;
    const result = searchTerm ? data.filter(note => note.title.includes(searchTerm)) : data;
    res.json(result);
});

app.get('/api/notes/:id', (req, res) => {
    res.json(data.find(note => note.id === Number(req.params.id)));
});

app.get('/boom', (req, res, next) => {
    throw new Error('Boom!!');
  });

app.use(function(req, res, next){
    const err = new Error('Not found');
    err.status = 404;
    res.status(404).json({ message: 'Not Found'});
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });