
export class NoteImg extends React.Component {

    constructor() {
        super();
        this.savingTimeout = null;
    }

    state = {

        title: '',
        imgUrl: '',
        style: {},
        isPinned: null,
        opacityClass: '',
        hiddenClass: 'hidden-img',
        saving: false
    };

    componentDidMount() {
        // console.log(this.props.note);
        this.setState({
            title: this.props.note.info.title,
            imgUrl: this.props.note.info.imgUrl,
            style: this.props.note.style,
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
            note.info.imgUrl = this.state.imgUrl;
            note.style = this.state.style;

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

    onLoadShowImg = () => {

        this.setState({ hiddenClass: '' });
    }

    render() {
        const { title, imgUrl, opacityClass, style, hiddenClass } = this.state;
        const { toggleView, note, addClass } = this.props;
        return ( //
            <div className={`note note-img flex column align-center space-center ${hiddenClass} ${addClass} ${opacityClass}`}
                style={style} onClick={() => toggleView(note.id, note.isPinned)}>
                <input type="text" name="title" className="title" defaultValue={title} onChange={this.handleChange} />
                <img src={imgUrl} alt="" onLoad={this.onLoadShowImg} />
            </div>
        )
    }
};