const express = require('express');
const notesRouter = express.Router();

//load array of notes
const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);


notesRouter.get('/notes', (req, res, next) => {
    const { searchTerm } = req.query;
    
    notes.filter(searchTerm)
        .then(list => res.json(list))
        .catch(err => next(err));

    /*notes.filter(searchTerm, (err, list) => {
        if(err) return next(err);
        res.json(list);
    });
    */
});

notesRouter.get('/notes/:id', (req, res, next) => {
    const id = req.params.id;
    notes.find(id)
        .then(note => res.json(note))
        .catch(err => next(err));
    
    /*
    notes.find(id, (err, note) => {
        if(err) return next(err);
        res.json(note);
    });
    */
});

notesRouter.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const updateObj = {};
    const updateFields = ['title', 'content'];

    updateFields.forEach(field => {
        if(field in req.body) updateObj[field] = req.body[field]
    });

    notes.update(id, updateObj)
        .then(note => {
            if(note) res.json(note)
            else next();
        });

    /*notes.update(id, updateObj, (err, note) => {
        if(err) next(err);
        if(note) res.json(note);
        else next();
    });
    */
});

notesRouter.post('/notes', (req, res, next) => {
    const { title, content } = req.body;
    const newItem = { title, content};
    
    if(!newItem.title){
        const err = new Error('Missing `title` in request body');
        err.status = 400;
        return next(err);
    }

    notes.create(newItem)
        .then(note => {
            if(note) res.location(`http://${req.headers.host}/notes/${note.id}`).status(201).json(note);
            else next();
        })
        .catch(err => next(err));

    /* notes.create(newItem, (err, note) => {
        if(err) return next(err);

        if(note) res.location(`http://${req.headers.host}/notes/${note.id}`).status(201).json(note);
        else next();
    }); */
});

notesRouter.delete('/notes/:id', (req, res, next) => {
    const id = Number(req.params.id);
    notes.delete(id)
        .then(() => res.sendStatus(204))
        .catch(err => next(err));
    /*notes.delete(id, err => {
        if(err) {
            return next(err);
        } else {
            res.status(204).end();
        }
    });
    */
});

module.exports = notesRouter;