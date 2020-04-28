import utilService from '../../services/utilService.js';

export class NoteAdd extends React.Component {

    constructor() {
        super();
        this.firstInput = React.createRef();
    }

    state = {
        isOpen: false,
        type: 'NoteTxt',
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
            mapSearch: '',
        },
    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    onAddNote = (event) => {
        event.preventDefault();

        var note = {};

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
                        title: stateNote.title,
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
                        title: stateNote.title,
                        mapSearch: stateNote.mapSearch,
                    },
                }
                break;

        }
        note.id = utilService.makeId();
        note.isPinned = false;
        note.created = Date.now();

        this.props.addNote(note);
    }

    onChangeNote = ({ target }) => {
        // console.log(this.state.note);

        const field = target.name
        const value = target.value;

        this.setState(prevState => ({ note: { ...prevState.note, [field]: value } }), console.log(this.state.note));
    }

    onUserClick = () => {
        // console.log(this.state.isOpen);
        if (this.state.isOpen) return;

        let addToolsClass = (this.state.addToolsClass === 'open-tools') ? '' : 'open-tools';

        this.setState(({ isOpen }) => ({
            isOpen: !isOpen,
            addToolsClass: addToolsClass
        }));
    }

    onTypeChange = (type) => {

        this.setState({ type: type });
    }

    render() {

        const { isOpen, addToolsClass, type, note } = this.state;
        const headerType = (type === 'NoteTodos') ? 'label' : 'title';

        return (
            <section className={`add-note-section flex column align-center space-center`} onClick={() => this.onUserClick()}>
                <form onSubmit={this.onAddNote} className={`todo-form flex ${(isOpen) ? 'column' : ''} align-center space-center`}>
                    {isOpen && <input type="text" name={headerType}
                        placeholder={headerType[0].toUpperCase() + headerType.slice(1)} value={note.title} onChange={this.onChangeNote} />}
                    {type === 'NoteTxt' &&
                        <textarea name="" id="" cols="1" rows={(isOpen) ? 3 : 1} placeholder="Take a note..."
                            ref={this.firstInput} value={note.txt} onChange={this.onChangeNote} name="txt"></textarea>}
                    {type === 'NoteImg' &&
                        <input type="text" name="imgUrl" placeholder="Image Url" onChange={this.onChangeNote} />}
                    {type === 'NoteVideo' &&
                        <input type="text" name="videoUrl" placeholder="Youtube Url" onChange={this.onChangeNote} />}
                    {type === 'NoteAudio' &&
                        <input type="text" name="audioUrl" placeholder="Audio Url" onChange={this.onChangeNote} />}
                    {type === 'NoteMap' &&
                        <input type="text" name="mapSearch" placeholder="Search Location" onChange={this.onChangeNote} />}
                    {type === 'NoteTodos' &&
                        <input type="text" name="todos" placeholder="Todo" onChange={this.onChangeNote} />}
                    <div className={`add-note-tools flex align-center space-between ${addToolsClass}`}>
                        <button type="submit">Add</button>
                        <img src="../../assets/img/keep/text.png" className={(type === 'NoteTxt') ? 'active-tool' : ''} onClick={() => this.onTypeChange('NoteTxt')} />
                        <img src="../../assets/img/keep/photo.png" className={(type === 'NoteImg') ? 'active-tool' : ''} onClick={() => this.onTypeChange('NoteImg')} />
                        <img src="../../assets/img/keep/map.png" className={(type === 'NoteMap') ? 'active-tool' : ''} onClick={() => this.onTypeChange('NoteMap')} />
                        <img src="../../assets/img/keep/video.png" className={(type === 'NoteVideo') ? 'active-tool' : ''} onClick={() => this.onTypeChange('NoteVideo')} />
                        <img src="../../assets/img/keep/audio.png" className={(type === 'NoteAudio') ? 'active-tool' : ''} onClick={() => this.onTypeChange('NoteAudio')} />
                        <img src="../../assets/img/keep/todo.png" className={(type === 'NoteTodos') ? 'active-tool' : ''} onClick={() => this.onTypeChange('NoteTodos')} />
                    </div>
                </form>
            </section>
        )
    }
};