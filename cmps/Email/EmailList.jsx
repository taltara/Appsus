import { EmailPreview } from './EmailPreview.jsx'
const { Link } = ReactRouterDOM


export default function EmailList(props) {
    return (

        <table>
            <tbody className="emails-container">
                {props.emails.map(email => <EmailPreview key={email.id} email={email} onOpenEmail={props.onOpenEmail} />)}
            </tbody>
        </table>

    )
}