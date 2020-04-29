import utilService from './utilService.js';
import storageService from './storageService.js';

var gNotes = null;
const STORAGE_KEY = 'myNotes';

const NOTETXT = 'NoteTxt';
const NOTEIMG = 'NoteImg';
const NOTETODOS = 'NoteTodos';
const NOTEVIDEO = 'NoteVideo';
const NOTEMAP = 'NoteMap';
const NOTEAUDIO = 'NoteAudio';


export default {
    query,
    save,
    add,
    remove,
    getById,
    populateNotes,
}

function populateNotes () {

    if (!gNotes) gNotes = storageService.load(STORAGE_KEY, noteDb);
    storageService.store(STORAGE_KEY, gNotes);

    return Promise.resolve();
}


function query(searchBy, labelFilter = null) {

    if (!gNotes || !searchBy) gNotes = storageService.load(STORAGE_KEY, noteDb);

    var currNotes = gNotes;
    let deleted = false;

    if(labelFilter && !Array.isArray(labelFilter)) {
        currNotes = gNotes.filter(note => {

            return note.labels.some(label => {
                return label === labelFilter;
            })
        });
    } else if (Array.isArray(labelFilter) && labelFilter[0] === 'toDelete') {

        currNotes = gNotes.filter(note => {

            return note.toDelete;
        });
        deleted = true;
    } else if (Array.isArray(labelFilter) && labelFilter[0] === 'isArchived') {

        currNotes = gNotes.filter(note => {

            return note.isArchived;
        });
        deleted = true;
    }


    if (searchBy && searchBy != '') {

        currNotes = currNotes.filter(note => {

            if (note.toDelete && !deleted || note.isArchived && !deleted) return false;
            else if (note.type === NOTETXT) {

                return (note.info.txt.toLowerCase()).includes(searchBy) ||
                    (note.info.title.toLowerCase()).includes(searchBy);

            } else if (note.type === NOTEIMG) {

                return (note.info.title.toLowerCase()).includes(searchBy);

            } else if (note.type === NOTETODOS) {

                return ((note.info.label.toLowerCase()).includes(searchBy) || note.info.todos.some(todo => {

                    let match = (todo.txt.toLowerCase()).includes(searchBy);
                    console.log(match);
                    if (match) return match;
                }));

            } else if (note.type === NOTEVIDEO) {

                return (note.info.title.toLowerCase()).includes(searchBy) ||
                        (note.info.videoUrl.toLowerCase().includes(searchBy));

            } else if (note.type === NOTEMAP) {

                return (note.info.title.toLowerCase()).includes(searchBy) ||
                        (note.info.mapSearch.toLowerCase().includes(searchBy));

            } else if (note.type === NOTEAUDIO) {

                return (note.info.title.toLowerCase()).includes(searchBy) ||
                        (note.info.audioUrl.toLowerCase().includes(searchBy));

            }
        })

    } else {

        if(!deleted) {

            currNotes = currNotes.filter(note => {
                return !note.toDelete && !note.isArchived;
            })

        }
    }

    return Promise.resolve(currNotes);
}


function save(noteToSave) {

    const noteIdx = _getIdxById(noteToSave.id);
    gNotes[noteIdx] = noteToSave;

    storageService.store(STORAGE_KEY, gNotes);

    return Promise.resolve();
}

function add(noteToSave) {
    console.log(noteToSave);
    (gNotes) ? gNotes.push(noteToSave) : gNotes = [noteToSave];
    storageService.store(STORAGE_KEY, gNotes);

    return Promise.resolve();
}

function remove(noteId) {

    const noteIdx = _getIdxById(noteId);
    gNotes.splice(noteIdx, 1);
    storageService.store(STORAGE_KEY, gNotes);

    return Promise.resolve();
}

function getById(noteId) {

    let note;

    if (gNotes) note = gNotes.find(note => note.id === noteId);
    else {

        gNotes = storageService.load(STORAGE_KEY, noteDb);
        note = gNotes.find(note => note.id === noteId);
        console.log(note);
    }

    return Promise.resolve(note);
}

function _getIdxById(noteId) {
    return gNotes.findIndex(note => note.id === noteId)
}

var noteDb = [

    {
        type: "NoteTxt",
        isPinned: true,
        info: {
            title: 'My Passion',
            txt: "Fullstack Me Baby!"
        },
        created: 1587924629901,
        id: 'ASDF4',
        labels: [
            'work',
            'important'
        ],
        toDelete: true,
        isArchived: false,
    },
    {
        type: "NoteTxt",
        isPinned: false,
        info: {
            title: 'My Passion',
            txt: "Fullstack Me Baby!"
        },
        created: 1587924629902,
        id: 'ASDF4s',
        labels: [
            'home',
            'important'
        ],
        toDelete: false,
        isArchived: false,
    },
    {
        type: "NoteTxt",
        isPinned: false,
        info: {
            title: 'My Passion',
            txt: "Fullstack Me Baby!"
        },
        created: 1587924629903,
        id: 'ASDF24',
        labels: [
            'game night',
        ],
        toDelete: false,
        isArchived: false,
    },
    {
        type: "NoteImg",
        isPinned: false,
        info: {
            imgUrl: "https://lh3.googleusercontent.com/pTsIT19-HJlFIIsM4oBW8CRFnALgXsLYTJTqaho0CT9bQ_s4c7ACp4foz8nvKL5pqhPFaOv-jDN2I6S3n5q6YNacD26tAoqQsjONUNNkT3sZfIQ328O9oYuwJb-aieuMlaW2HjP7QkVhY7gHrj9GnwwdYUKF1GrDug-GQw4_ly6hvyoRBfxRxe52Ew8-NfhetmegY88d1T0km4Cf8931jX4x0cduXLr1aAJE-QZ9z7a2UnLY4o4yluSvh2hELI6JROepICEt3FXAAjpPxld-phFtUvF7xHX3JBvQ8J2bVUhVNmHqKBX8PnIh8CDNOBih_GbBb8bjwj2Cx1gRxYILxi6b3N9j5frRVGTtvhkd3HoaggbVw4ZcXexsh63M7FhXQr37xcA2vMwP7J87yu7xWZC2gzj6fTtjFLzVFQ8tr2CMUQV077y3Pm5-Mqshycf_qMqixNblbWEpM2fSYgeefAoydq1jAGJAAgDN2kWoVKM067d4E1dJpPhN0YyPMqmwGBwGPL6aIUsBrZZTQUaLrHNHflSp7fQy6GK4u2bxDsfNVpa0WY-uG6fWD53M3y9TcR_dx3eMT1G7kUxCDxdwSwjt-Nu4xGMSSNIAetNhpuAk5WthPwb1KZ_VaZTdER32xZpjIah9Oqo12nAVIjoA5I4HkAE9Q1eq_aTkKkqG6B5OpOHwUv6W0U6lPfqdmg=w1410-h1057-no",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#00d"
        },
        created: 1587924629909,
        id: 'ASDF249',
        labels: [
            'secret',
            'important'
        ],
        toDelete: false,
        isArchived: true,
    },
    {
        type: "NoteTodos",
        isPinned: false,
        info: {
            label: "How was it:",
            todos: [
                { txt: "0", doneAt: null },
                { txt: "1", doneAt: 187111111 },
                { txt: "2", doneAt: null },
                { txt: "3", doneAt: 187111111 },
                { txt: "4", doneAt: 187111111 },
            ]
        },
        created: 1587924629503,
        id: 'ASDh74',
        labels: [
            'game night',
            'the sopranos'
        ],
        toDelete: false,
        isArchived: false,
    },
    {
        type: "NoteVideo",
        isPinned: true,
        info: {
            title: "Wow!",
            videoUrl: 'https://www.youtube.com/watch?v=aFLFujQNX9s'
        },
        created: 1587926629903,
        id: 'AHDh74',
        labels: [

        ],
        toDelete: false,
        isArchived: false,
    },
    {
        type: "NoteAudio",
        isPinned: false,
        info: {
            title: "Wow!",
            audioUrl: 'https://www.computerhope.com/jargon/m/example.mp3'
        },
        created: 1587967629903,
        id: 'Bjhf74',
        labels: [
            'work',
            'gaming'
        ],
        toDelete: false,
        isArchived: false,
    },
    {
        type: "NoteMap",
        isPinned: true,
        info: {
            title: "Wow!",
            mapSearch: '34/27 sheshet hayamim, kfar saba'
        },
        created: 1387467629903,
        id: 'Bjkf74',
        labels: [

            'important'
        ],
        toDelete: false,
        isArchived: false,
    }
];