const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.getNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes)
};

notesCtrl.createNotes = async (req, res) => {
    const { title, content, date, author } = req.body;

    const newNote = new Note({
        title,
        content,
        date,
        author
    });
    await newNote.save();

    res.json({ message: 'Notes send' });
};

notesCtrl.getUniqueNote = async (req, res) => {

    const note = await Note.findById(req.params.id);
    res.json(note);

};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notes deleted' });
};

notesCtrl.updateNote = async (req, res) => {
    const { title, content, author } = req.body;
    await Note.findOneAndUpdate(req.params.id, {
        title,
        author,
        content
    })
    res.json({ title: 'Titulo de nota' })
};

module.exports = notesCtrl;