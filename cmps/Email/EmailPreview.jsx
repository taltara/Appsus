const { Link } = ReactRouterDOM


// import { EmailDetails } from '../../pages/Email/EmailDetails.jsx'


export class EmailPreview extends React.Component {

    state = {
        email: null,
        isOpen: false
    };

    componentDidMount() {
        this.setState({ email: this.props, isOpen: false })
    }

    onSelect() {
        return;
    }

    onToggleOpenDetails = () => {
        this.setState((prevState) => {
            return {
                isOpen: !prevState.isOpen
            }
        })
    }

    onOpenDetails() {
        <Link to={`/email/${this.state.email.id}`}>he</Link>
    }

    showSentAtAsDate = (sentAt) => {
        let date = new Date(sentAt)
        if (date.getDate() === new Date().getDate()) return `${date.getHours()}:${date.getMinutes()}`
        return `${date.getDate()}/${date.getMonth() + 1}`
    }

    render() {
        const { email, onOpenEmail } = this.props
        return (
            <React.Fragment>
                <tr className={(email.isRead) ? 'read' : 'unread'} onClick={() => {
                    // this.props.onOpenEmail(email.id)
                    this.onToggleOpenDetails()
                    this.onOpenDetails()
                }}>
                    <td>
                        <input className="btn" type="checkbox" onClick={this.onSelect} />
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
                        {this.showSentAtAsDate(email.sentAt)}
                    </td>
                    <td className="link-to-email-details">
                        <Link to={`/email/${email.id}`}><i className="fas fa-expand-arrows-alt"></i></Link>
                    </td>
                </tr >
                {/* {this.state.isOpen && <EmailDetails email={email} />} */}
            </React.Fragment>
        )
    }
}