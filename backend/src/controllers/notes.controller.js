const notesCtrl = {};

notesCtrl.getNotes = (req, res) => res.json({ message: [] });

notesCtrl.createNotes = (req, res) => res.json({ message: 'Notes send' });

notesCtrl.updateNote = (req, res) => res.json({ message: 'Notes updated' });

notesCtrl.deleteNote = (req, res) => res.json({ message: 'Notes deleted' });

notesCtrl.getUniqueNote = (req, res) => res.json({ title: 'Titulo de nota' });

module.exports = notesCtrl;