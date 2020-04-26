export class NoteSection extends React.Component {

    constructor() {
        super();

    }

    state = {
        type: 'NoteText',
        title: '',

    };

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value;

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filter);
        })
    }

    render() {
        const { title } = this.state;
        return (
            <div className="note">
                <input type="text" className="title" value={title} onChange={this.handleChange}/>
                
            </div>
        )
    }
};