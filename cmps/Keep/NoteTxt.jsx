

export class NoteTxt extends React.Component {

    constructor() {
        super();
        this.savingTimeout = null;
    }

    state = {

        title: '',
        txt: '',
        isPinned: null,
        opacityClass: '',
        saving: false
    };

    componentDidMount() {
        // console.log(this.props.note);
        this.setState({ 
            title: this.props.note.info.title,
            txt: this.props.note.info.txt,
            isPinned: this.props.note.isPinned
        });
    }

    componentDidUpdate() {

        if(this.state.opacityClass === '' && this.props.addClass != ''){
            setTimeout(() => {
                this.setState({ opacityClass: 'show-note'});
                
            }, 150);
        } else if (this.state.opacityClass != '' && this.props.addClass === ''){

            setTimeout(() => {
                this.setState({ opacityClass: ''});
                
            }, 50);
        }
    }

    handleUpdateTimeout = () => {

        this.savingTimeout = setTimeout(() => {
            let note = { ...this.props.note };
            note.title = this.state.title;
            note.isPinned = this.state.isPinned;
            note.info.txt = this.state.txt;

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
        this.setState(({  [field]: value } ), () => {

            this.onSaveNote();
        });
        
        
    }


    render() {
        const { title, txt, opacityClass } = this.state;
        const { toggleView, note, addClass } = this.props;
        return ( 
            <div className={`note note-txt flex column align-center space-center ${addClass} ${opacityClass}`} onClick={() => toggleView(note.id, note.isPinned)}>
                <input type="text" className="title" defaultValue={title} onChange={this.handleChange} />
                <textarea name="" cols="1" rows="5" placeholder="Take a note..." onChange={this.handleChange} name="txt" value={txt}></textarea>
            </div>
        )
    }
};