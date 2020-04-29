import { NoteTools } from 'NoteTools.jsx';

export class NoteTxt extends React.Component {

    constructor() {
        super();
        this.savingTimeout = null;
        this.transitionTimeout = null;
        this.transition = false;
    }

    state = {

        title: '',
        txt: '',
        isPinned: null,
        opacityClass: '',
        saving: false,
        hovering: false,
        style: { backgroundColor: "#3A3B3E" },
        labels: [],
        toDelete: false,
        isArchived: false,
    };

    componentDidMount() {
        // console.log(this.props.note);
        this.setState({
            title: this.props.note.info.title,
            txt: this.props.note.info.txt,
            isPinned: this.props.note.isPinned,
            style: this.props.note.style,
            toDelete: this.props.note.toDelete,
            isArchived: this.props.note.isArchived,
            labels: this.props.note.labels
        });
    }

    componentDidUpdate() {

        // if (this.state.opacityClass === '' && this.props.addClass != '') {
        //     setTimeout(() => {
        //         this.setState({ opacityClass: 'show-note' });

        //     }, 150);
        // } else if (this.state.opacityClass != '' && this.props.addClass === '') {

        //     setTimeout(() => {
        //         this.setState({ opacityClass: '' });

        //     }, 50);
        // }
    }

    componentWillUnmount() {

        clearTimeout(this.transitionTimeout);
    }

    handleUpdateTimeout = (delay = 2000) => {

        this.savingTimeout = setTimeout(() => {
            let note = { ...this.props.note };
            note.isPinned = this.state.isPinned;
            note.info.title = this.state.title;
            note.info.txt = this.state.txt;
            note.style = this.state.style
            note.toDelete = this.state.toDelete;
            note.isArchived = this.state.isArchived;
            note.labels = this.state.labels;
            this.props.saveNote(note);
            this.setState({ saving: false });
            // this.state.saving = false;
        }, delay);
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

    handleTools = (action) => {
        event.stopPropagation();
        if (action === 'pin') {
            console.log(this.state);
            this.transition = true;
            this.setState(({ isPinned }) => ({ isPinned: !isPinned }),
                () => {
                    console.log(this.state);
                    this.onSaveNote(0)
                });
            this.transitionTimeout = setTimeout(() => {
                this.transition = false;
            }, 200);

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
            if(update != '') {
                labels.push(update);
            }
            console.log(labels);
            this.setState(({ labels: labels }), () => {
                console.log(this.state.labels);
                this.onSaveNote(0);
            });
        }
    }

    avoidClickPropagation = () => {

        if (!this.transition) {

            this.transition = true;
            this.transitionTimeout = setTimeout(() => {
                this.transition = false;
            }, 200);
        }

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

    render() {
        const { title, txt, opacityClass, hovering, style } = this.state;
        const { addClass } = this.props;
        return (
            <div className={`note note-txt flex column align-center space-center ${addClass} ${opacityClass}`}
                onClick={() => this.onClick()} onMouseEnter={this.onHover} onMouseLeave={this.onHover} style={style}>
                <span className="note-header flex align-center space-center">
                    <input type="text" name="title" className="title" defaultValue={title} onChange={this.handleChange}
                     onClick={this.avoidClickPropagation} placeholder="Title" />
                    <img src="../assets/img/keep/pin.png" className={`tool-pin tool ${(hovering) ? 'show-tool' : ''}`} onClick={() => this.handleTools('pin')} />

                </span>
                <textarea name="" cols="1" rows="5" placeholder="Take a note..." onChange={this.handleChange}
                    name="txt" value={txt} onClick={this.avoidClickPropagation} placeholder="Enter Note"></textarea>
                <NoteTools hovering={hovering} updateFromTools={this.updateFromTools} onArchiveNote={this.onArchiveNote}
                    avoidClickPropagation={this.avoidClickPropagation} onRemoveNote={this.onRemoveNote} />
            </div>
        )
    }
};