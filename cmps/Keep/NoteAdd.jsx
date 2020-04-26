export class NoteAdd extends React.Component {

    constructor() {
        super();
        this.firstInput = React.createRef();
    }

    state = {
        isOpen: false,
        type: 'NoteText',
        addNoteClass: '',
        addToolsClass: '',
    };

    componentDidMount() {

    }
    componentDidUpdate() {
        
    }

    onUserClick = () => {
        console.log(this.state.isOpen);
        if(this.state.isOpen) return;

        let addNoteClass = (this.state.addNoteClass === 'column') ? '' : 'column';
        let addToolsClass = (this.state.addToolsClass === 'open-tools') ? '' : 'open-tools';

        this.setState(({ isOpen }) => ({
            isOpen: !isOpen,
            addNoteClass: addNoteClass,
            addToolsClass: addToolsClass,
        }));
    }

    render() {

        const { isOpen, addNoteClass, addToolsClass, type } = this.state;
        
        return (
            <section className={`add-note-section flex ${addNoteClass} align-center space-center`} onClick={() => this.onUserClick()}>
                {isOpen && <input type="text" name="title" placeholder="Title" />}

                <textarea name="" id="" cols="1" rows="1" placeholder="Take a note..." ref={this.firstInput}></textarea>
                <div className={`add-note-tools flex align-center space-between ${addToolsClass}`}>
                    <img src="../../assets/img/keep/text.png" alt=""/>
                    <img src="../../assets/img/keep/photo.png" alt=""/>
                    <img src="../../assets/img/keep/video.png" alt=""/>
                    <img src="../../assets/img/keep/audio.png" alt=""/>
                    <img src="../../assets/img/keep/todo.png" alt=""/>
                </div>
            </section>
        )
    }
};