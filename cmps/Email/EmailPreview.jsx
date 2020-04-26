const { Link } = ReactRouterDOM

import { EmailDetails } from './EmailDetails.jsx'


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

    render() {
        const { email, onOpenEmail } = this.props
        return (
            <React.Fragment>
                <tr className={(email.isRead) ? 'read' : 'unread'} onClick={() => {
                    this.props.onOpenEmail(email.id)
                    this.onToggleOpenDetails()
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
                </tr >
                {this.state.isOpen && <EmailDetails email={email} />}
            </React.Fragment>
        )
    }
}