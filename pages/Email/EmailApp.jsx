import emailService from '../../services/emailService.js'
import EmailList from '../../cmps/Email/EmailList.jsx'
import EmailNavBar from '../../cmps/Email/EmailNavBar.jsx'
import EmailsFilter from '../../cmps/Email/EmailFilter.jsx'
import { EmailDetails } from './EmailDetails.jsx'
const { Route, Switch } = ReactRouterDOM;

function DynamicCmp(props) {
    switch (props.currView) {
        case 'Inbox':
            return <EmailList emails={props.emails} updateCurrView={props.updateCurrView}></EmailList>
        case 'Important':
            return <EmailList emails={props.emails} updateCurrView={props.updateCurrView}></EmailList>
        case 'Sent':
            return <Sent {...props} />
        default:
            return '//...some default error view'
    }
}

export class EmailApp extends React.Component {

    state = {
        emails: null,
        currView: 'Inbox',
        filterBy: null
    };

    componentDidMount() {
        // emailService._createEmails();
        this.loadEmails();
    }

    loadEmails(currView, filterBy) {
        emailService.query(currView, filterBy)
            .then(emails => {
                this.setState({ emails })
            })
    }

    // onOpenEmail = (emailId) => {
    //     emailService.emailIsRead(emailId);
    //     this.loadEmails();
    // }

    updateCurrView = (currView) => {
        console.log('currView', currView);

        this.setState({ currView, emails: this.loadEmails(currView, this.state.filterBy) });
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => this.loadEmails(this.state.currView, filterBy))
    }

    render() {
        const { emails, currView, filterBy } = this.state
        return (
            <div className="flex emails-main">
                <EmailNavBar updateCurrView={this.updateCurrView}></EmailNavBar>
                <Switch>
                    <Route component={EmailDetails} path="/email/:emailId" />
                    <Route component={() => {
                        return (
                            <div className="email-search-and-table">
                                <EmailsFilter onSetFilter={this.onSetFilter}></EmailsFilter>
                                {/* {emails && <EmailList emails={emails} onOpenEmail={this.onOpenEmail}></EmailList>} */}
                                {emails &&
                                    <DynamicCmp
                                        currView={currView} emails={emails}
                                        updateCurrView={this.updateCurrView}>
                                    </DynamicCmp>}
                            </div>
                        )
                    }} path="/email" />
                </Switch>
            </div>

        )
    }
};