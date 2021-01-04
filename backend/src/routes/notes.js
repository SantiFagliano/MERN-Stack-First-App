const { Router } = require('express');
const router = Router();

const { getNotes, createNotes, getUniqueNote, updateNote, deleteNote } = require('../controllers/notes.controller');

router.route('/')
    .get(getNotes)
    .post(createNotes);

router.route('/:id')
    .delete(deleteNote)
    .put(updateNote)
    .get(getUniqueNote);


module.exports = router;