export default class Filter extends React.Component {
    state = {
        filter: {
            title: '',
            author: '',
            maxPrice: '',
            minPrice: ''
        }
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value;

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filter)
        })
    }
    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filter)
    }

    
    render() {
        const { title, maxPrice, minPrice, author } = this.state.filter
        const { isSearchShown } = this.props;
        return (
            <span className={`filter-area ${(isSearchShown) ? 'bottom-filter' : ''}`}>
                <p className="filter-title">Filter:</p>
                <section className="filter-box flex column">
                    <form onSubmit={this.onFilter} className="filter-form flex space-between align-center wrap">

                        <div className="name-filters flex column">
                            <label htmlFor="">By Title</label>
                            <input autoFocus type="text" name='title' value={title} onChange={this.handleChange} />
                            <label htmlFor="">By Author</label>
                            <input type="text" name='author' value={author} onChange={this.handleChange} />

                        </div>

                        <div className="price-filters flex column">

                            <label htmlFor="">Min Price</label>
                            <input type="number" name='minPrice' value={minPrice} onChange={this.handleChange} />
                            <label htmlFor="">Max Price</label>
                            <input type="number" name='maxPrice' value={maxPrice} onChange={this.handleChange} />

                        </div>

                        <button className="btn">Filter</button>
                    </form>

                </section>
            </span>
        )
    }
}