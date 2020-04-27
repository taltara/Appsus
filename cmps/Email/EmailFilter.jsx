export default class Filter extends React.Component {
    state = {
        filter: {
            title: ''
        }
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value

        this.setState(prevState => ({ filter: { ...prevState.filter, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filter)
        })
    }
    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filter)
    }
    render() {
        const { title } = this.state.filter
        return (
            <section className="search-section flex align-center space-center">
                <img src="../../assets/img/search.svg" alt="" />
                <input type="text" name='title' placeholder="Search" className="filter-input" value={title} onChange={this.handleChange} />
            </section>

        )

    }
    // render() {
    //     const { title } = this.state.filter
    //     return (
    //         <div className="filter-email-container">
    //             <form onSubmit={this.onFilter}>
    //                 <input type="text" name='title' className="filter-input" value={title} onChange={this.handleChange} />

    //                 <button><i class="fas fa-search"></i></button>
    //             </form>
    //         </div>
    //     )

    // }
}