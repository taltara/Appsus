export default class SelectionFilter extends React.Component {

    state = {
        isOpenAll: false
    }

    onToggleOpenEmails = () => {
        this.setState((prevState) => {
            return {
                isOpenAll: !prevState.isOpenAll
            }
        },()=>{
            console.log(this.state.isOpenAll);
            this.props.markAsReadForAllSelected(this.state.isOpenAll)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props);
    }

    checkClassName() {
        if (this.state.isOpenAll) {
            return 'fas fa-envelope-open'
        }
        return 'fas fa-envelope'
    }

    render() {
        return (
            <div className="selection-container">
                <button onClick={() => { this.props.removeAllEmailsSelected() }}>
                    <i className="fas fa-trash"></i>
                </button>
                <button onClick={() => {
                    this.onToggleOpenEmails();
                }}>
                    <i className={this.checkClassName()}></i>
                </button>
            </div>
        )
    }
}