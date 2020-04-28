import { NoteList } from '../../cmps/Keep/NoteList.jsx';
import { NoteAdd } from '../../cmps/Keep/NoteAdd.jsx';
import { NoteSearch } from '../../cmps/Keep/NoteSearch.jsx';
import keepService from '../../services/keepService.js'

export class NoteApp extends React.Component {

    constructor() {
        super();
        this.pinnedNotes;
        this.unpinnedNotes;
    }

    state = {
        notes: [],
        searchBy: '',
        noteInFocus: false,
        noteInFocusObj: {}
    };

    componentDidMount() {
        this.initNotes();
    }

    initNotes = () => {

        keepService.populateNotes()
            .then(() => {
                this.loadNotes();
            })
    }

    componentDidUpdate() {

    }

    saveNote = (note) => {
        console.log(note);
        keepService.save(note)
            .then(() => {
                this.loadNotes();
            });
    }

    addNote = (note) => {

        console.log(note);
        var notes = [...this.state.notes, note];
        console.log(notes);
        this.setState({ notes: notes });
    }

    loadNotes() {
        console.log(this.state.searchBy);
        let searchBy = (this.state.searchBy === '') ? null : this.state.searchBy;
        keepService.query(searchBy)
            .then(notes => {
                console.log(notes);
                this.setState({ notes: notes });
            });
    }

    onSearch = (searchBy) => {

        this.setState({ searchBy: searchBy }, () => this.loadNotes());
    }

    toggleView = (noteId, isPinned) => {
        console.log(noteId);
        let noteInFocusAndNext = {};
        let noteNextId = null;

        if (this.state.noteInFocusObj.noteId === noteId) return;
        else if (this.state.noteInFocusObj.noteId) noteId = null;
        else {
            let noteIdx;

            if (isPinned) {

                noteIdx = this.pinnedNotes.findIndex(note => {
                    return note.id === noteId;
                });

                if (noteIdx >= 0 && noteIdx != this.pinnedNotes.length - 1) {
                    noteNextId = this.pinnedNotes[noteIdx + 1].id;
                }

            } else {

                noteIdx = this.unpinnedNotes.findIndex(note => {
                    return note.id === noteId;
                });

                if (noteIdx >= 0 && noteIdx != this.unpinnedNotes.length - 1) {
                    noteNextId = this.unpinnedNotes[noteIdx + 1].id;
                }
            }
        }
        noteInFocusAndNext = { noteNextId, noteId };

        this.setState(({ noteInFocus }) => ({
            noteInFocus: !noteInFocus,
            noteInFocusObj: noteInFocusAndNext
        }));
    }


    render() {

        const { notes, noteInFocus, noteInFocusObj } = this.state;

        var pinnedNotes = [];
        var unpinnedNotes = [];

        notes.forEach((note) => {
            // console.log(note);

            if (note.isPinned) pinnedNotes.unshift(note);
            else unpinnedNotes.unshift(note);
        });
        this.pinnedNotes = pinnedNotes;
        this.unpinnedNotes = unpinnedNotes;

        return (
            <main className={`keep-main ${(noteInFocus) ? 'menu-open' : ''}`}>
                <section className="screen" onClick={this.toggleView}></section>
                <div className="keep-content flex column align-center space-center">
                    <section className="keep-content-header flex column align-center space-center">
                        <NoteSearch onSearch={this.onSearch} />
                        <NoteAdd addNote={this.addNote} />
                    </section>
                    {notes.length && <NoteList pinnedNotes={pinnedNotes} unpinnedNotes={unpinnedNotes}
                        toggleView={this.toggleView} noteInFocusObj={noteInFocusObj} saveNote={this.saveNote} />}
                </div>

            </main>
        )
    }
};