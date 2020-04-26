import emailService from '../../services/emailService.js'
import EmailList from '../../cmps/Email/EmailList.jsx'

export class MisterEmail extends React.Component {

    state = {
        emails: null
    };

    componentDidMount() {
        this.loadBooks();
    }

    componentDidUpdate() {

    }

    loadBooks() {
        // emailService.query(this.state.filterBy)
        emailService.query()
            .then(emails => {
                this.setState({ emails })
            })
    }

    onOpenEmail = (emailId) => {
        emailService.emailIsRead(emailId);
        this.loadBooks();
    }

    render() {
        const { emails } = this.state
        return (
            <section>
                {emails && <EmailList emails={emails} onOpenEmail={this.onOpenEmail}></EmailList>}
            </section>
        )
    }
};