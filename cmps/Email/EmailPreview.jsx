const { Link } = ReactRouterDOM

// import { EmailDetails } from '../../pages/Email/EmailDetails.jsx'


export class EmailPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        };

        this.onSelect = this.onSelect.bind(this);
    }

    state = {
        isSelected: false

    };

    componentDidMount() {
    }

    onSelect = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        // ev.stopPropagation()
        this.setState({
            [name]: value
        });
        // debugger
        this.props.onSelectEmail(this.props.email.id);
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

    showSentAtAsDate = (sentAt) => {
        let date = new Date(sentAt)
        if (date.getDate() === new Date().getDate()) return `${date.getHours()}:${date.getMinutes()}`
        return `${date.getDate()}/${date.getMonth() + 1}`
    }

    render() {
        const { email, onOpenEmail } = this.props

        return (
            <React.Fragment>
                <tr className={(email.isRead) ? 'read' : 'unread'}>
                    <td>
                        <button className="btn-select" onClick={this.onSelect}>
                            <i className={(email.isSelect)? "fas fa-check-square": "far fa-check-square" }></i>
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
                        {this.showSentAtAsDate(email.sentAt)}
                    </td>
                    <td className="link-to-email-details" onClick={() => onOpenEmail(email.id)}>
                        <Link to={`/email/${email.id}`}><i className="fas fa-expand-arrows-alt"></i></Link>
                    </td>
                </tr >
                {/* {this.state.isOpen && <EmailDetails email={email} />} */}
            </React.Fragment>
        )
    }
}