import { NoteList } from '../../cmps/Keep/NoteList.jsx';
import { NoteAdd } from '../../cmps/Keep/NoteAdd.jsx';
import { NoteSearch } from '../../cmps/Keep/NoteSearch.jsx';
import keepService from '../../services/keepService.js'

export class MissKeep extends React.Component {

    constructor() {
        super();

    }

    state = {
        notes: [],
        searchBy: '',
    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    addNote = (note) => {

        this.setState(({ prevState }) => ({ notes: [ ...prevState.notes, note] }));
    }

    loadNotes() {
        keepService.query(this.state.searchBy)
            .then(notes => {
                this.setState({ notes: notes });
            });
    }

    onSearch = (searchBy) => {

        this.setState({ searchBy: searchBy }, () => this.loadNotes(searchBy));
    }

    render() {

        const { notes } = this.state;

        return (
            <main className="keep-main">
                <div className="keep-content flex column align-center space-center">
                    <section className="keep-content-header flex column align-center space-center">
                        <NoteSearch onSearch={this.onSearch} />
                        <NoteAdd addNote={this.addNote} />
                    </section>
                    <NoteList notes={notes} />
                </div>

            </main>
        )
    }
};