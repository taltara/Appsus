import emailService from '../../services/emailService.js'
import EmailList from '../../cmps/Email/EmailList.jsx'
import EmailNavBar from '../../cmps/Email/EmailNavBar.jsx'
import EmailsFilter from '../../cmps/Email/EmailFilter.jsx'
import SelectionFilter from '../../cmps/Email/SelectionFilter.jsx'
import { EmailDetails } from './EmailDetails.jsx'
const { Route, Switch } = ReactRouterDOM;

function DynamicCmp(props) {
    switch (props.currView) {
        case 'Inbox':
        case 'Important':
            return <EmailList emails={props.emails}
                updateCurrView={props.updateCurrView}
                onSelectEmail={props.onSelectEmail}
                onOpenEmail={props.onOpenEmail}></EmailList>
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

    loadEmails() {
        emailService.query(this.state.currView, this.state.filterBy)
            .then(emails => {
                this.setState({ emails })
            })
    }

    onOpenEmail = (emailId) => {
        emailService.emailIsRead(emailId);
        this.loadEmails();
    }

    onSelectEmail = (emailId) => {
        emailService.emailIsSelect(emailId);
        this.loadEmails();
    }

    updateCurrView = (currView) => {
        console.log('currView', currView);

        this.setState({ currView }, () => {
            this.loadEmails()
        });
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy: { ...filterBy } }, () => this.loadEmails())
    }

    onRemoveAllEmailsSelected = () => {
        emailService.removeAllEmailsSelected();
        this.loadEmails();
    }

    onMarkAsReadForAllSelected = (isRead) => {
        emailService.markAsReadForAllSelected(isRead);
        this.loadEmails();
    }


    render() {
        const { emails, currView, filterBy } = this.state
        return (
            <div className="flex emails-main">
                <EmailNavBar
                    updateCurrView={this.updateCurrView}
                    unReadEmails={emailService.unReadEmails}
                ></EmailNavBar>
                <Switch>
                    <Route component={EmailDetails} path="/email/:emailId" />
                    <Route render={() => {
                        return (
                            <div className="email-search-and-table">
                                <EmailsFilter onSetFilter={this.onSetFilter}></EmailsFilter>
                                <SelectionFilter onRemoveAllEmailsSelected={this.onRemoveAllEmailsSelected} markAsReadForAllSelected={this.onMarkAsReadForAllSelected} />
                                {/* {emails && <EmailList emails={emails} onOpenEmail={this.onOpenEmail}></EmailList>} */}
                                {emails &&
                                    <DynamicCmp
                                        onOpenEmail={this.onOpenEmail}
                                        currView={currView} emails={emails}
                                        onSelectEmail={this.onSelectEmail}
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