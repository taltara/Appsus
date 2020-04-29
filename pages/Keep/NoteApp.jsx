import { NoteList } from '../../cmps/Keep/NoteList.jsx';
import { NoteAdd } from '../../cmps/Keep/NoteAdd.jsx';
import { NoteSearch } from '../../cmps/Keep/NoteSearch.jsx';
import keepService from '../../services/keepService.js';
import { eventBus } from "../../services/eventBusService.js";
import { SideMenu } from '../../cmps/Keep/SideMenu.jsx';
import { UserMsg } from '../../cmps/UserMsg.jsx';

export class NoteApp extends React.Component {

    constructor() {
        super();
        this.pinnedNotes;
        this.unpinnedNotes;
        this.notesLabels = {};
        this.bodyColor = '#202124';
        this.appNavColor = '#1c1d20';
        this.filterByLabel = null;
    }

    state = {
        notes: [],
        searchBy: '',
        noteInFocus: false,
        noteInFocusObj: {},
    };

    initNotes = () => {

        keepService.populateNotes()
            .then(() => {
                this.loadNotes();
            })
    }

    componentDidMount() {
        this.initNotes();
    }


    componentDidUpdate(prevProps, prevState) {

        if (prevProps.bodyColor !== this.bodyColor) {
            // const bodyElt = document.querySelector("body");
            document.body.style.backgroundColor = this.bodyColor;
            document.querySelector('.app-nav').style.backgroundColor = this.appNavColor;
            document.querySelector('.app-nav').style.backgroundImage = 'none';
            document.querySelector('.app-nav').style.borderBottom = '1px inset rgba(255, 255, 255, 0.25)';

        }
    }

    componentWillUnmount() {

        document.body.style.backgroundColor = 'unset';
        document.querySelector('.app-nav').style.backgroundColor = 'unset';
        document.querySelector('.app-nav').style.backgroundImage = '';
        document.querySelector('.app-nav').style.borderBottom = 'none';
    }

    saveNote = (note) => {
        console.log(note);
        keepService.save(note)
            .then(() => {
                this.loadNotes();
                this.emitSaving();
            });
    }

    deleteNote = (note) => {
        console.log(note);
        keepService.remove(note.id)
            .then(() => {
                this.loadNotes();
            });
    }

    emitSaving = () => {

        eventBus.emit('savedNote', { txt: `Saved!` });
    }

    addNote = (note) => {

        // console.log(note);
        var notes = [...this.state.notes, note];
        // console.log(notes);
        this.emitSaving();
        keepService.add(note)
            .then(() => {
                this.loadNotes();
            })
        // this.setState({ notes: notes });
    }

    loadNotes() {
        
        let searchBy = (this.state.searchBy === '') ? null : this.state.searchBy;
        keepService.query(searchBy, this.filterByLabel)
            .then(notes => {
            
                this.setState({ notes: notes });
            });
    }

    onSearch = (searchBy, label = null) => {
        console.log(label, this.filterByLabel);

        if(label.deleted) this.filterByLabel = ['toDelete'];
        else if(label.archived) this.filterByLabel = ['isArchived'];
        else if (label) this.filterByLabel = label;
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

            if (note.labels) {

                note.labels.forEach(label => {

                    if (label in this.notesLabels) this.notesLabels[label] += 1;
                    else this.notesLabels[label] = 1;
                });
            }

            if (note.isPinned) pinnedNotes.unshift(note);
            else unpinnedNotes.unshift(note);
        });
        this.pinnedNotes = pinnedNotes;
        this.unpinnedNotes = unpinnedNotes;

        return (
            <main className={`keep-main ${(noteInFocus) ? 'menu-open' : ''}`}>
                <UserMsg savedNote={true} type={'savedNote'}/>

                <SideMenu labels={this.notesLabels} onSearch={this.onSearch} />
                <section className="screen" onClick={this.toggleView}></section>
                <div className="keep-content flex column align-center space-center">
                    <section className="keep-content-header flex column align-center space-center">
                        <NoteSearch onSearch={this.onSearch} />
                        <NoteAdd addNote={this.addNote} />
                    </section>
                    {notes.length && <NoteList pinnedNotes={pinnedNotes} unpinnedNotes={unpinnedNotes} deleteNote={this.deleteNote}
                        toggleView={this.toggleView} noteInFocusObj={noteInFocusObj} saveNote={this.saveNote} />}
                </div>

            </main>
        )
    }
};