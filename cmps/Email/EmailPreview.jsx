const { Link } = ReactRouterDOM

// import { EmailDetails } from '../../pages/Email/EmailDetails.jsx'


export class EmailPreview extends React.Component {

    state = {
        isSelected: false
    };

    componentDidUpdate(prevProps) {
        if(prevProps.isRefresh !== this.props.isRefresh) this.setState({ isSelected: false })
    }

    onSelect = () => {
        this.setState((prevState) => {
            return {
                isSelected: !prevState.isSelected
            }
        }, () => {
            this.props.onSelectEmail(this.props.email.id);
        })
    }

    onToggleClass(email) {
        if (email.isSelected) {
            return "fas fa-check-square"
        }
        return "far fa-check-square"
    }

    onToggleOpenDetails = () => {
        this.setState((prevState) => {
            return {
                isOpen: !prevState.isOpen
            }
        })
    }

    onOpenDetails() {
        <Link to={`/email/${this.props.email.id}`}></Link>
    }

    // showSentAtAsDate = (sentAt) => {
    //     let date = new Date(sentAt)
    //     if (date.getDate() === new Date().getDate()) return `${date.getHours()}:${date.getMinutes()}`
    //     return `${date.getDate()}/${date.getMonth() + 1}`
    // }

    render() {
        const { email, onOpenEmail } = this.props
        return (
            <React.Fragment>
                <tr className={(email.isRead) ? 'read' : 'unread'}>
                    <td>
                        <button className="btn-select" onClick={this.onSelect}>
                            <i className={(this.state.isSelected) ? "fas fa-check-square" : "far fa-check-square"}></i>
                        </button>
                        {/* <input value={this.state.isSelected} type="checkbox" checked={this.state.isSelected} onChange={this.onSelect} /> */}
                    </td>
                    <td>
                        {email.sentBy}
                    </td>
                    <td>
                        {email.subject}
                    </td>
                    <td>
                        {email.body}
                    </td>
                    <td>
                        {email.sentAt}
                    </td>
                    <td className="link-to-email-details" onClick={() => onOpenEmail(email.id, true)}>
                        <Link to={`/email/${email.id}`}><i className="fas fa-expand-arrows-alt"></i></Link>
                    </td>
                </tr >
                {/* {this.state.isOpen && <EmailDetails email={email} />} */}
            </React.Fragment>
        )
    }
}