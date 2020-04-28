import emailService from '../../services/emailService.js'
import EmailList from '../../cmps/Email/EmailList.jsx'
import EmailNavBar from '../../cmps/Email/EmailNavBar.jsx'
import EmailsFilter from '../../cmps/Email/EmailFilter.jsx'
import SelectionFilter from '../../cmps/Email/SelectionFilter.jsx'
import { EmailDetails } from './EmailDetails.jsx'
import { CreateEmail } from './CreateEmail.jsx';

const { Route, Switch } = ReactRouterDOM;

function DynamicCmp(props) {
    switch (props.currView) {
        case 'Inbox':
        case 'Important':
        case 'Sent':
            return <EmailList emails={props.emails}
                updateCurrView={props.updateCurrView}
                onSelectEmail={props.onSelectEmail}
                onOpenEmail={props.onOpenEmail}></EmailList>
        default:
            return '//...some default error view'
    }
}

export class EmailApp extends React.Component {

    state = {
        emails: null,
        currView: 'Inbox',
        filterBy: null,
        selectedEmails: [/*{ids..}*/]
    };

    componentDidMount() {
        this.loadEmails();
    }

    loadEmails = () => {
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
        if (currView === 'Sent') {
            this.setState({ currView, filterBy: { isSent: true } }, () => {
                this.loadEmails()
                console.log(this.state);
                
            });
        }
        if (currView === 'Important' || currView === 'Inbox') {
            this.setState({ currView, filterBy: { isSent: false } }, () => {
                this.loadEmails()
                console.log(this.state);

            });
        }
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy: { ...filterBy } }, () => this.loadEmails())
    }

    onRemoveAllEmailsSelected = () => {

        var prms = this.state.selectedEmails.map(id => {
            return emailService.remove(id)
        });
        Promise.all(prms).then(() => {
            this.setState({ selectedEmails: [] })
            this.loadEmails();
        })
        // emailService.removeAllEmailsSelected();
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
                <CreateEmail></CreateEmail>
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