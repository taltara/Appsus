export class NoteAdd extends React.Component {

    constructor() {
        super();
        this.firstInput = React.createRef();
    }

    state = {
        isOpen: false,
        type: 'NoteTxt',
        addNoteClass: '',
        addToolsClass: '',
        note: {
            title: '',
            txt: '',
            label: '',
            todos: [],
            imgUrl: '',
            videoUrl: '',
            style: {},
            audioUrl: '',
            map: {},
        },
    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    onAddNote = (event) => {
        event.preventDefault();

        var note = {};
        var created = Date.now();
        note.isPinned = false;
        note.created = created;

        var stateNote = this.state.note;

        switch (this.state.type) {

            case 'NoteTxt':
                note = {
                    type: 'NoteTxt',
                    info: {
                        title: stateNote.title,
                        txt: stateNote.txt
                    },
                }

                break;

            case 'NoteImg':

                note = {
                    type: 'NoteImg',
                    info: {
                        imgUrl: stateNote.imgUrl,
                        title: stateNote.title
                    },
                    style: stateNote.style
                }
                break;

            case 'NoteTodos':
                note = {
                    type: 'NoteTodos',
                    info: {
                        label: stateNote.label,
                        todos: stateNote.todos,
                    },
                    
                }

                break;

            case 'NoteVideo':

                note = {
                    type: 'NoteVideo',
                    info: {
                        label: stateNote.label,
                        videoUrl: stateNote.videoUrl,
                    },
                }
                break;
                
            case 'NoteAudio':

                note = {
                    type: 'NoteAudio',
                    info: {
                        title: stateNote.title,
                        audioUrl: stateNote.audioUrl,
                    },
                }
                break;

            case 'NoteMap':

                note = {
                    type: 'NoteMap',
                    info: {
                        label: stateNote.label,
                        map: {},
                    },
                }
                break;

        }
        
        this.props.addNote(note);
    }

    onChangeNote = ({ target }) => {

        const field = target.name
        const value = target.value;

        this.setState(prevState => ({ note: { ...prevState.note, [field]: value } }));
    }

    onUserClick = () => {
        if (this.state.isOpen) return;

        let addNoteClass = (this.state.addNoteClass === 'column') ? '' : 'column';
        let addToolsClass = (this.state.addToolsClass === 'open-tools') ? '' : 'open-tools';

        this.setState(({ isOpen }) => ({
            isOpen: !isOpen,
            addNoteClass: addNoteClass,
            addToolsClass: addToolsClass,
        }));
    }

    onTypeChange = (type) => {

        this.setState({ type });
    }

    render() {

        const { isOpen, addNoteClass, addToolsClass, type } = this.state;

        return (
            <section className={`add-note-section flex ${addNoteClass} align-center space-center`} onClick={() => this.onUserClick()}>
                <form onSubmit={this.onAddNote} className={`todo-form flex ${addNoteClass} align-center space-center`}>
                    {isOpen && <input type="text" name="title" placeholder="Title" onChange={this.onChangeNote} />}
                    <textarea name="" id="" cols="1" rows={(isOpen) ? 3 : 1} placeholder="Take a note..."
                        ref={this.firstInput} onChange={this.onChangeNote} name="txt"></textarea>

                    <div className={`add-note-tools flex align-center space-between ${addToolsClass}`}>
                        <button type="submit">Add</button>
                        <img src="../../assets/img/keep/text.png" className={(type === 'NoteTxt') ? 'active-tool' : ''} onClick={() => this.onTypeChange('NoteTxt')} />
                        <img src="../../assets/img/keep/photo.png" className={(type === 'NoteImg') ? 'active-tool' : ''} onClick={() => this.onTypeChange('NoteImg')} />
                        <img src="../../assets/img/keep/video.png" className={(type === 'NoteVideo') ? 'active-tool' : ''} onClick={() => this.onTypeChange('NoteVideo')} />
                        <img src="../../assets/img/keep/audio.png" className={(type === 'NoteAudio') ? 'active-tool' : ''} onClick={() => this.onTypeChange('NoteAudio')} />
                        <img src="../../assets/img/keep/todo.png" className={(type === 'NoteTodos') ? 'active-tool' : ''} onClick={() => this.onTypeChange('NoteTodos')} />
                    </div>
                </form>
            </section>
        )
    }
};