import { NoteTools } from 'NoteTools.jsx';

export class NoteImg extends React.Component {

    constructor() {
        super();
        this.savingTimeout = null;
        this.transitionTimeout = null;
        this.transition = false;
    }

    state = {

        title: '',
        imgUrl: '',
        style: {},
        isPinned: null,
        opacityClass: '',
        hiddenClass: 'hidden-img',
        saving: false,
        hovering: false,
        labels: [],
        style: { backgroundColor: "#3A3B3E" },
        toDelete: false,
        isArchived: false,
    };

    componentDidMount() {
        // console.log(this.props.note);
        this.setState({
            title: this.props.note.info.title,
            imgUrl: this.props.note.info.imgUrl,
            style: this.props.note.style,
            isPinned: this.props.note.isPinned,
            toDelete: this.props.note.toDelete,
            isArchived: this.props.note.isArchived,
            labels: this.props.note.labels
        });
    }

    componentDidUpdate() {

        // if (this.state.opacityClass === '' && this.props.addClass != '') {
        //     setTimeout(() => {
        //         this.setState({ opacityClass: 'show-note' });

        //     }, 100);
        // } else if (this.state.opacityClass != '' && this.props.addClass === '') {

        //     setTimeout(() => {
        //         this.setState({ opacityClass: '' });

        //     }, 150);
        // }
    }

    componentWillUnmount () {

        clearTimeout(this.transitionTimeout);
    }

    handleUpdateTimeout = (delay = 2000) => {

        this.savingTimeout = setTimeout(() => {
            let note = { ...this.props.note };
            note.isPinned = this.state.isPinned;
            note.info.title = this.state.title;
            note.info.imgUrl = this.state.imgUrl;
            note.style = this.state.style;
            note.toDelete = this.state.toDelete;
            note.isArchived = this.state.isArchived;
            note.labels = this.state.labels;
            this.props.saveNote(note);
            this.setState({ saving: false });
            // this.state.saving = false;
        }, delay);
    }

    onArchiveNote = () => {
        this.avoidClickPropagation();
        console.log('here');
        this.handleTools('archived');
    }

    onRemoveNote = () => {
        this.avoidClickPropagation();
        if (this.state.toDelete) {
            this.props.deleteNote(this.props.note);
        } else {
            console.log('here');
            this.handleTools('delete');
        }
    }

    onSaveNote = (delay = 2000) => {

        if (this.state.saving) {

            clearInterval(this.savingTimeout);
            this.handleUpdateTimeout(delay);

        } else {

            this.setState({ saving: true }, () => {

                this.handleUpdateTimeout(delay);
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

    handleTools = (action) => {

        if (action === 'pin') {
            console.log(this.state);
            this.transition = true;
            this.setState(({ isPinned }) => ({ isPinned: !isPinned }),
            () => {
                this.onSaveNote(0)});
                this.transitionTimeout = setTimeout(() => {
                    this.transition = false;
                }, 300);
        } else if (action === 'delete') {

            this.transition = true;
            this.setState({ toDelete: true }, () => {
                console.log(this.state);
                this.onSaveNote(0)
            });
            this.transitionTimeout = setTimeout(() => {
                this.transition = false;
            }, 200);
        } else if (action === 'archived') {

            this.transition = true;
            this.setState(({ isArchived }) => ({ isArchived: !isArchived }), () => {
                console.log(this.state);
                this.onSaveNote(0)
            });
            this.transitionTimeout = setTimeout(() => {
                this.transition = false;
            }, 200);
        }
    }

    onHover = () => {

        this.setState(({ hovering }) => ({ hovering: !hovering }));
    }

    onClick = () => {
        if (this.transition) return;
        if(this.state.toDelete) {

            this.setState({ toDelete: false }, () => {

                this.onSaveNote(0);
            });

        } else {

            this.props.toggleView(this.props.note.id, this.props.note.isPinned);
        }
    }

    updateFromTools = (update, type) => {
        console.log(update);

        if(type === 'style') {

            this.setState(({ style }) => ({ style: { ...style, ...update} }), () => {
                console.log(this.state.style);
                this.onSaveNote(0);
            });
        } else if (type === 'label') {

            let labels = this.state.labels;
            labels.push(update);
            console.log(labels);
            this.setState(({ labels: labels }), () => {
                console.log(this.state.labels);
                this.onSaveNote(0);
            });
        }
    }

    avoidClickPropagation = () => {
        
        if(!this.transition) {

            this.transition = true;
            this.transitionTimeout = setTimeout(() => {
                this.transition = false;
            }, 200);
        }
        
    }

    render() {
        const { title, imgUrl, opacityClass, style, hiddenClass, hovering, labels } = this.state;
        const { addClass } = this.props;
        return ( //
            <div className={`note note-img flex column align-center space-center ${hiddenClass} ${addClass} ${opacityClass}`}
                style={style} onClick={() => this.onClick()} onMouseEnter={this.onHover} onMouseLeave={this.onHover}>
                <span className="note-header flex align-center space-center">
                    <input type="text" name="title" className="title" defaultValue={title} 
                    onChange={this.handleChange} onClick={this.avoidClickPropagation} placeholder="Title" />
                    <img src="assets/img/keep/pin.png" className={`tool-pin tool ${(hovering) ? 'show-tool' : ''}`} 
                    onClick={() => this.handleTools('pin')} />

                </span>
                <img src={imgUrl} alt="" onLoad={this.onLoadShowImg} />
                <NoteTools hovering={hovering} updateFromTools={this.updateFromTools}  onArchiveNote={this.onArchiveNote}
                avoidClickPropagation={this.avoidClickPropagation} onRemoveNote={this.onRemoveNote} labels={labels} />
            </div>
        )
    }
};
