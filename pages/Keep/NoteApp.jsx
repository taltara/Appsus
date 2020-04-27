import { NoteList } from '../../cmps/Keep/NoteList.jsx';
import { NoteAdd } from '../../cmps/Keep/NoteAdd.jsx';
import { NoteSearch } from '../../cmps/Keep/NoteSearch.jsx';
import keepService from '../../services/keepService.js'

export class NoteApp extends React.Component {

    constructor() {
        super();

    }

    state = {
        notes: [],
        searchBy: '',
        noteInFocus: false,
        noteInFocusId: null
    };

    componentDidMount() {
        this.loadNotes();
    }
    componentDidUpdate() {

    }

    addNote = (note) => {

        console.log(note);
        var notes = [ ...this.state.notes, note];
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

    toggleView = (noteId) => {
        console.log(noteId);
        if(this.state.noteInFocusId === noteId) return;
        else if(this.state.noteInFocusId) noteId = null;

        this.setState(({ noteInFocus }) => ({
            noteInFocus: !noteInFocus,
            noteInFocusId: noteId
        }));
    }


    render() {

        const { notes, noteInFocus, noteInFocusId } = this.state;

        return (
            <main className={`keep-main ${(noteInFocus) ? 'menu-open' : ''}`}>
                <section className="screen" onClick={this.toggleView}></section>
                <div className="keep-content flex column align-center space-center">
                    <section className="keep-content-header flex column align-center space-center">
                        <NoteSearch onSearch={this.onSearch} />
                        <NoteAdd addNote={this.addNote} />
                    </section>
                    {notes.length && <NoteList notes={notes} toggleView={this.toggleView} noteInFocusId={noteInFocusId} />}
                </div>

            </main>
        )
    }
};