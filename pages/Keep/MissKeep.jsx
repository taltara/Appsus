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

    onAddNote = () => {


    }

    loadNotes(searchBy) {
        keepService.query(searchBy)
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
            <section className="keep-main">
                <div className="container flex column align-center space-center">

                    <NoteSearch onSearch={this.onSearch} />
                    <NoteAdd onAddNote={this.onAddNote}/>
                    <NoteList notes={notes} />
                </div>

            </section>
        )
    }
};