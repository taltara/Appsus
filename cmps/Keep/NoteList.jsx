import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteTodos } from './NoteTodos.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteAudio } from './NoteAudio.jsx';
import { NoteMap } from './NoteMap.jsx';

export class NoteList extends React.Component {

    constructor() {
        super();

    }

    state = {
        pinnedNotes: [],
        unpinnedNotes: [],
    };

    componentDidMount() {
        
        var pinnedNotes = [];
        var unpinnedNotes = [];

        this.props.notes.forEach((note) => {

            if(note.isPinned) pinnedNotes.unshift(note);
            else unpinnedNotes.unshift(note);
        });

        this.setState({ pinnedNotes, unpinnedNotes });

    }
    componentDidUpdate() {

    }

    DynamicCmp = (note) => {

        switch (note.type) {

            case 'NoteTxt':
                return <NoteTxt note={note}/>;
            case 'NoteImg':
                return <NoteImg note={note}/>;
            case 'NoteTodos':
                return <NoteTodos note={note}/>;
            case 'NoteVideo':
                return <NoteVideo note={note}/>;
            case 'NoteAudio':
                return <NoteAudio note={note}/>;
            case 'NoteMap':
                return <NoteMap note={note}/>;
            
        }
    }

    render() {
        const { pinnedNotes, unpinnedNotes } = this.state;
        return (
            <section className="notes-section flex align-center space-evenly">
                {pinnedNotes.length && 
                    <div className="notes-pinned">
                        {
                            pinnedNotes.map(note => {

                                return this.DynamicCmp(note);
                            })
                        }
                    </div>
                }
                {unpinnedNotes.length && 
                    <div className="notes-unpinned">
                        {
                            unpinnedNotes.map(note => {

                                return this.DynamicCmp(note);
                            })
                        }
                    </div>
                }

            </section>
        )
    }
};