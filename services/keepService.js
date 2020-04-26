import utilService from './utilService.js';
import storageService from './storageService.js';

var gNotes = null;
const STORAGE_KEY = 'myNotes';

export default {

}


function query(searchBy) {

    if (!gNotes) gNotes = storageService.load(STORAGE_KEY, noteDb);

    if (searchBy) {
        console.log(searchBy);


        if (note.type === 'NoteText') {

            gNotes = gNotes.filter(note => {

                return (note.info.txt.toLowerCase()).includes(searchBy) ||
                (note.info.title.toLowerCase()).includes(searchBy);
            })
        }

        if (note.type === 'NoteImg') {

            gNotes = gNotes.filter(note => {

                return (note.info.title.toLowerCase()).includes(searchBy);
            })
                
        }

        if (note.type === 'NoteToDos') {

            gNotes = gNotes.filter(note => {
                
                return ((note.info.label.toLowerCase()).includes(searchBy) || note.info.todos.some(todo => {
    
                    let match = (todo.txt.toLowerCase()).includes(searchBy);
                    // console.log(match);
                    if (match) return match;
                }))

            })
        }
    }

    return Promise.resolve(gNotes);
}


function save(noteToSave) {

    const noteIdx = _getIdxById(noteToSave.id);
    gNotes[noteIdx] = noteToSave;

    storageService.store(STORAGE_KEY, gNotes);
}

function add(noteToSave) {

    (gNotes) ? gNotes.unshift(noteToSave) : gNotes = [noteToSave];
    storageService.store(STORAGE_KEY, gNotes);
}

function remove(noteId) {

    const noteIdx = _getIdxById(noteId);
    gNotes.splice(noteIdx, 1);
    storageService.store(STORAGE_KEY, gNotes);

    return Promise.resolve();
}

function getById(noteId) {

    if (!gNotes) {

        gNotes = storageService.load(STORAGE_KEY, noteDb);

        const note = gNotes.find(note => note.id === noteId);
        console.log(note);

        return Promise.resolve(note);


    } else {

        const note = gNotes.find(note => note.id === noteId)
        return Promise.resolve(note);

    }
}

function _getIdxById(noteId) {
    return gBooks.findIndex(note => note.id === noteId)
}

var noteDb = [

    {
        type: "NoteText",
        isPinned: true,
        info: {
            title: 'My Passion',
            txt: "Fullstack Me Baby!"
        }
    },
    {
        type: "NoteImg",
        info: {
            url: "http://some-img/me",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        type: "NoteTodos",
        info: {
            label: "How was it:",
            todos: [
                { txt: "Do that", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ]
        }
    }
];