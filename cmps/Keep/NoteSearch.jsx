export class NoteSearch extends React.Component {

    constructor() {
        super();
        this.firstInput = React.createRef();
    }

    state = {
        searchBy: '',
        inFocus: false,
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

    onFocusToggle = () => {

        this.setState(({inFocus}) => ({

            inFocus: !inFocus
        }));
    }

    render() {

        const { searchBy, inFocus } = this.state;

        return (
            <section className={`search-section flex align-center space-center ${(inFocus) ? 'search-section-focus' : 'search-section-unfocus'}`}>
                <img src="../../assets/img/search.svg" alt=""/>
                <input type="text" name='search' onBlur={this.onFocusToggle} onFocus={this.onFocusToggle} value={searchBy} onChange={this.handleChange} ref={this.firstInput} placeholder="Search" />
            </section>
        )
    }
};