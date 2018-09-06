'use strict';
const { PORT } = require('./config');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

const express = require('express');
const morgan = require('morgan');
const app = express();
const notesRouter = require('./router/notes.router');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

app.use('/api', notesRouter);

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