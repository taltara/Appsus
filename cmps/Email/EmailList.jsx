import { EmailPreview } from './EmailPreview.jsx'
const { Link } = ReactRouterDOM


export default function EmailList(props) {
    let refresh = false;
    return (

        <div className="table-container">
            <table>
                <tbody className="emails-container">
                    {props.emails.map(email => <EmailPreview key={email.id} email={email}
                        onOpenEmail={props.onOpenEmail}
                        isRefresh={props.isRefresh}
                        onSelectEmail={props.onSelectEmail}
                        updateCurrView={props.updateCurrView}
                        onEmailIsImportant={props.onEmailIsImportant}
                        getSelectedEmails={props.getSelectedEmails}
                    />)}
                </tbody>
            </table>
        </div>

    )
}