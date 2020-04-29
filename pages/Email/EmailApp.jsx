import emailService from '../../services/emailService.js'
import EmailList from '../../cmps/Email/EmailList.jsx'
import EmailNavBar from '../../cmps/Email/EmailNavBar.jsx'
import EmailsFilter from '../../cmps/Email/EmailFilter.jsx'
import SelectionFilter from '../../cmps/Email/SelectionFilter.jsx'
import { EmailDetails } from './EmailDetails.jsx'
import { CreateEmail } from './CreateEmail.jsx';
//TO.DO ask jonathan about the problem with set state of isSelected at EmailPreview, solution without props!!
const { Route, Switch } = ReactRouterDOM;



export class EmailApp extends React.Component {

    state = {
        emails: null,
        currView: 'Inbox',
        filterBy: null,
        selectedEmails: [],
        isRefresh: false
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

    onSelectEmail = (emailId) => {
        const { selectedEmails } = this.state;
        var emailIdx = selectedEmails.findIndex((id) => id === emailId);
        if (emailIdx === -1) selectedEmails.push(emailId);
        else selectedEmails.splice(emailIdx, 1);
        this.loadEmails();
    }

    updateCurrView = (currView) => {
        if (currView === 'Sent') {
            this.setState(prevState => {return { currView, filterBy: { isSent: true }, selectedEmails: [], isRefresh: !prevState.isRefresh }}, () => {
                this.loadEmails()
                console.log(this.state);

            });
        }
        if (currView === 'Important' || currView === 'Inbox') {
            this.setState(prevState => {return{ currView, filterBy: { isSent: false }, selectedEmails: [], isRefresh: !prevState.isRefresh }}, () => {
                this.loadEmails()
                console.log(this.state);

            });
        }
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy: { ...filterBy } }, () => this.loadEmails())
    }

    onRemoveAllEmailsSelected = () => {
        console.log('this.state.selectedEmails', this.state.selectedEmails);

        var prms = this.state.selectedEmails.map(id => {
            return emailService.remove(id)
        });
        Promise.all(prms).then(() => {
            this.setState({ selectedEmails: [] })
            this.loadEmails();
        })
    }

    //on click from email preview to open email
    onOpenEmail = (emailId, isRead) => {
        emailService.emailIsRead(emailId, isRead);
        this.loadEmails();
    }

    //on click selection as read emails
    onSelectedEmailsIsRead = (isRead) => {
        const { selectedEmails } = this.state;
        var prms = selectedEmails.map(id => {
            return emailService.emailIsRead(id, isRead);
        });
        Promise.all(prms).then(() => {
            this.loadEmails();
        })
    }

    getSelectedEmails() {
        return this.state.selectedEmails;
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
                    {/* <Route component={CreateEmail} path="/email/:emailId/:to" /> */}
                    <Route render={() => {
                        return (
                            <div className="email-search-and-table">
                                <EmailsFilter onSetFilter={this.onSetFilter}></EmailsFilter>
                                <SelectionFilter removeAllEmailsSelected={this.onRemoveAllEmailsSelected} selectedEmailsIsRead={this.onSelectedEmailsIsRead} />
                                {emails && <EmailList emails={emails}
                                    isRefresh={this.state.isRefresh}
                                    updateCurrView={this.updateCurrView}
                                    onSelectEmail={this.onSelectEmail}
                                    onOpenEmail={this.onOpenEmail}
                                ></EmailList>}
                            </div>
                        )
                    }} path="/email" />
                </Switch>


            </div>
        )

    }
};