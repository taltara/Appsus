import { EmailPreview } from './EmailPreview.jsx'

export default function EmailList(props) {
    return (

        <table>
            <tbody className="emails-container">
                {props.emails.map(email => <EmailPreview key={email.id} email={email} onOpenEmail={props.onOpenEmail} />)}
            </tbody>
        </table>

    )
}