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
            this.props.selectedEmailsIsRead(this.state.isOpenAll)
        })
    }

    componentDidUpdate(prevProps, prevState) {
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
                <button onClick={this.props.removeAllEmailsSelected}>
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