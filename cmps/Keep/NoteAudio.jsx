
export class NoteAudio extends React.Component {

    constructor() {
        super();
        this.savingTimeout = null;
    }

    state = {

        title: '',
        audioUrl: '',
        isPinned: null,
        opacityClass: '',
        saving: false
    };

    componentDidMount() {

        // console.log(this.props.note);
        let audioUrl = this.props.note.info.audioUrl;

        this.setState({
            title: this.props.note.info.title,
            audioUrl: audioUrl,
            isPinned: this.props.note.isPinned
        });
    }

    componentDidUpdate() {

        if (this.state.opacityClass === '' && this.props.addClass != '') {
            setTimeout(() => {
                this.setState({ opacityClass: 'show-note' });

            }, 100);
        } else if (this.state.opacityClass != '' && this.props.addClass === '') {

            setTimeout(() => {
                this.setState({ opacityClass: '' });

            }, 150);
        }
    }

    handleUpdateTimeout = () => {

        this.savingTimeout = setTimeout(() => {
            let note = { ...this.props.note };
            note.isPinned = this.state.isPinned;
            note.info.title = this.state.title;
            note.info.audioUrl = this.state.audioUrl;
            console.log(note);
            this.props.saveNote(note);
            this.state.saving = false;
        }, 2000);
    }

    onSaveNote = () => {

        if(this.state.saving) {
    
            clearInterval(this.savingTimeout);
            this.handleUpdateTimeout();
            
        } else {
            
            this.setState({ saving: true }, () => {

                this.handleUpdateTimeout();
            })
        }
    }

    handleChange = ({ target }) => {

        console.log(target);
        const field = target.name
        const value = target.value;
        this.setState(({ [field]: value }), () => {

            this.onSaveNote();
        });

    }

    render() {
        const { title, audioUrl, opacityClass, style, hiddenClass } = this.state;
        const { toggleView, note, addClass } = this.props;
        return (
            <div className={`note note-video flex column align-center space-center ${hiddenClass} ${addClass} ${opacityClass}`}
                style={style} onClick={() => toggleView(note.id, note.isPinned)}>
                <input type="text" name="title" className="title" defaultValue={title} onChange={this.handleChange} />
                <span className="iframe-span flex align-center space-center">
                    <audio
                        controls
                        src={audioUrl}>
                        Your browser does not support the
                            <code>audio</code> element.
                    </audio>
                </span>
            </div>
        )
    }
};