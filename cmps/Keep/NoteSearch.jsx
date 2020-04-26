export class NoteSearch extends React.Component {

    constructor() {
        super();
        this.firstInput = React.createRef();
    }

    state = {
        searchBy: '',
    };

    componentDidMount() {
        this.firstInput.current.focus();
    }
    componentDidUpdate() {

    }

    handleChange = ({ target }) => {
        var searchBy = target.value;
        this.setState(({ searchBy }), () => {

            this.props.onSearch(this.state.searchBy);
        });
    }

    render() {

        const { searchBy } = this.state;

        return (
            <section className="search-section flex align-center space-center">
                <img src="../../assets/img/search.svg" alt=""/>
                <input type="text" name='search' value={searchBy} onChange={this.handleChange} ref={this.firstInput} placeholder="Search" />
            </section>
        )
    }
};