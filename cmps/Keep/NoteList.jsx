import { NoteSection } from './NoteSection.jsx'

export class NoteList extends React.Component {

    constructor() {
        super();

    }

    state = {
        
    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    render() {

        return (
            <React.Fragment>
                <NoteSection />
                <NoteSection />
            </React.Fragment>
        )
    }
};