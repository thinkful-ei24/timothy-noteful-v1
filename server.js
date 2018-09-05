'use strict';
const { PORT } = require('./config');

// Load array of notes
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');
const { logger } = require('./middleware/logger');
const app = express();

app.use(logger);
app.use(express.static('public'));
app.use(express.json());


app.get('/api/notes', (req, res) => {
    const { searchTerm } = req.query;
    notes.filter(searchTerm, (err, list) => {
        if(err) return next(err);
        res.json(list);
    });
});

app.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    notes.find(id, (err, note) => {
        if(err) return next(err);
        res.json(note);
    });
});

app.put('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const updateObj = {};
    const updateFields = ['title', 'content'];

    updateFields.forEach(field => {
        if(field in req.body) updateObj[field] = req.body[field]
    });

    notes.update(id, updateObj, (err, note) => {
        if(err) next(err);
        if(note) res.json(note);
        else next();
    });

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