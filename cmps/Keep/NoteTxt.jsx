

export class NoteTxt extends React.Component {

    constructor() {
        super();
    }

    state = {

        title: '',
        txt: '',
        opacityClass: ''
    };

    componentDidMount() {
        console.log(this.props.note);
        this.setState({ 
            title: this.props.note.info.title,
            txt: this.props.note.info.txt,
        });
    }

    componentDidUpdate() {

        if(this.state.opacityClass === '' && this.props.addClass != ''){
            setTimeout(() => {
                this.setState({ opacityClass: 'show-note'});
                
            }, 100);
        } else if (this.state.opacityClass != '' && this.props.addClass === ''){

            setTimeout(() => {
                this.setState({ opacityClass: ''});
                
            }, 150);
        }
    }

    handleChange = ({ target }) => {
        console.log(target);
        const field = target.name
        const value = target.value;

        this.setState(({  [field]: value } ), () => {

        })
    }


    render() {
        const { title, txt, opacityClass } = this.state;
        const { toggleView, note, addClass } = this.props;
        return ( //
            <div className={`note note-txt flex column align-center space-center ${addClass} ${opacityClass}`} onClick={() => toggleView(note.id)}>
                <input type="text" className="title" defaultValue={title} onChange={this.handleChange} />
                <textarea name="" cols="1" rows="5" placeholder="Take a note..." onChange={this.handleChange} name="txt" value={txt}></textarea>
            </div>
        )
    }
};