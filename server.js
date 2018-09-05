'use strict';
const { PORT } = require('./config');

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    const searchTerm = req.query.searchTerm;
    const result = searchTerm ? data.filter(note => note.title.includes(searchTerm)) : data;
    res.json(result);
});

app.get('/api/notes/:id', (req, res) => {
    res.json(data.find(note => note.id === Number(req.params.id)));
});

app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });