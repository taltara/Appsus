import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteTodos } from './NoteTodos.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteAudio } from './NoteAudio.jsx';
import { NoteMap } from './NoteMap.jsx';

export class NoteList extends React.Component {

    componentDidMount() {


    }
    componentDidUpdate() {
        
    }


    DynamicCmp = (note) => {

        var el = null;
        var addClass = '';
        // console.log(this.props.notes);
        
        if(this.props.noteInFocusObj.noteId === note.id){
            addClass = 'active-note';
        } else if (this.props.noteInFocusObj.noteNextId) {
            if(this.props.noteInFocusObj.noteNextId === note.id) {
                addClass = 'active-note-next';
            }
        }

        if (note.type === 'NoteTxt') {

            el = <NoteTxt note={note} key={note.created} toggleView={this.props.toggleView}
             addClass={addClass} saveNote={this.props.saveNote} />;
        } else if (note.type === 'NoteImg') {

            el = <NoteImg note={note} key={note.created} toggleView={this.props.toggleView}
             addClass={addClass} saveNote={this.props.saveNote}  />;
        } else if (note.type === 'NoteTodos') {

            el = <NoteTodos note={note} key={note.created} toggleView={this.props.toggleView}
             addClass={addClass} saveNote={this.props.saveNote}  />;
        } else if (note.type === 'NoteVideo') {

            el = <NoteVideo note={note} key={note.created} toggleView={this.props.toggleView}
             addClass={addClass} saveNote={this.props.saveNote}  />;
        } else if (note.type === 'NoteAudio') {

            el = <NoteAudio note={note} key={note.created} toggleView={this.props.toggleView}
             addClass={addClass} saveNote={this.props.saveNote}  />;
        } else if (note.type === 'NoteMap') {

            el = <NoteMap note={note} key={note.created} toggleView={this.props.toggleView}
             addClass={addClass} saveNote={this.props.saveNote}  />;
        }

        // console.log(el);
        return el;
    }

    render() {

        const {pinnedNotes, unpinnedNotes} = this.props;

        return (
            <section className="notes-section flex column align-center space-center">
                {pinnedNotes.length &&
                    <span className="pinned-span flex column align-start space-center wrap">
                        <p className="notes-sector-header">Pinned</p>
                        <div className="notes-pinned flex align-start space-start">
                            {
                                pinnedNotes.map(note => {
                                    let el = this.DynamicCmp(note);
                                    
                                    // console.log(el);
                                    return el;
                                })
                            }
                        </div>
                    </span>
                }
                {unpinnedNotes.length &&
                    <span className="unpinned-span flex column align-start space-center">
                        <p className="notes-sector-header">Unpinned</p>

                        <div className="notes-unpinned flex align-start space-start wrap">
                            {

                                unpinnedNotes.map(note => {

                                    let el = this.DynamicCmp(note);
                                    // console.log(el);
                                    return el;
                                })
                            }
                        </div>
                    </span>
                }

            </section>
        )
    }
};