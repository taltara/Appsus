
export class NoteVideo extends React.Component {

    constructor() {
        super();
        this.savingTimeout = null;
    }

    state = {

        title: '',
        videoUrl: '',
        isPinned: null,
        opacityClass: '',
        saving: false
    };

    youtube_parser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    getYoutubeVideoUrl = () => {

        let videoId = this.youtube_parser(this.props.note.info.videoUrl);
        return (`https://www.youtube.com/embed/${videoId}`);
    }

    componentDidMount() {
        // console.log(this.props.note);

        this.setState({
            title: this.props.note.info.title,
            videoUrl: this.getYoutubeVideoUrl(),
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
            note.info.videoUrl = this.state.videoUrl;

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
        const { title, videoUrl, opacityClass } = this.state;
        const { toggleView, note, addClass } = this.props;
        return (
            <div className={`note note-video flex column align-center space-center ${addClass} ${opacityClass}`}
                 onClick={() => toggleView(note.id, note.isPinned)}>
                <input type="text" name="title" className="title" defaultValue={title} onChange={this.handleChange} />
                <span className="iframe-span flex align-center space-center">
                    <iframe src={videoUrl}></iframe>
                </span>
            </div>
        )
    }
};