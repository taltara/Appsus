// note = {
//     type: 'NoteTxt',
//     info: {
//         title: stateNote.title,
//         txt: stateNote.txt
//     },
// }

export class NoteTxt extends React.Component {

    constructor() {
        super();

    }

    state = {

        title: '',
        txt: ''
    };

    componentDidMount() {

        this.setState({ 
            title: this.props.note.title,
            txt: this.props.note.txt,
        });
    }

    componentDidUpdate() {

    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value;

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {

        })
    }

    render() {
        const { title, txt } = this.state;
        return (
            <div className="note">
                <input type="text" className="title" value={title} onChange={this.handleChange} />
                <textarea name="" cols="1" rows="5" placeholder="Take a note..." onChange={this.handleChange} name="txt">{txt}</textarea>
            </div>
        )
    }
};