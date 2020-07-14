const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const {
    notes
} = require('./db/db.json');
const {
    addNote,
    idChecker
} = require('./library/notesindex');

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// add note and apply id based on length of array (just like in module)
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const newNote = addNote(req.body, notes);

    res.json(newNote)
});

app.delete('/api/notes/:id', (req, res) => {
    noteId = req.params.id;
    idChecker(noteId, notes);
    res.json({
        message: 'success',
        data: req.body
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});