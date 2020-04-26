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
        console.log('helooo');
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
                    <td className="sent-by">
                        {email.sentBy}
                    </td>
                    <td className="email-subject">
                        {email.subject}
                    </td>
                    <td className="email-body">
                        {email.body}
                    </td>
                    <td>
                        {email.sentAt}
                    </td>
                    <td>
                        <Link to={`/email/${email.id}`}><i className="fas fa-expand-arrows-alt"></i></Link>
                    </td>
                </tr >
                {/* {this.state.isOpen && <EmailDetails email={email} />} */}
            </React.Fragment>
        )
    }
}