import { EmailPreview } from './EmailPreview.jsx'
const { Link } = ReactRouterDOM


export default function EmailList(props) {
    
    
    return (
        <div className="table-container">
            <table>
                <tbody className="emails-container">
                    {props.emails.map(email => <EmailPreview key={email.id} email={email} updateCurrView={props.updateCurrView} />)}
                </tbody>
            </table>
        </div>

    )
}