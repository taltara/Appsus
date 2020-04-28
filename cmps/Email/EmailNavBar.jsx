// const { NavLink } = ReactRouterDOM
const { NavLink } = ReactRouterDOM


export default class EmailNavBar extends React.Component {

    state = { currView: 'Inbox' }

    checkClassActive(componentName) {
        if (componentName === this.state.currView){
            return 'email-nav-link-active'
        }
        return ''
    }

    render() {
        return (<aside className="email-nav-container" >
            <ul className="email-nav-links clean-list flex column">
                <li className={`${this.checkClassActive('Inbox')} email-nav-link`} onClick={() => {
                    this.props.updateCurrView('Inbox');
                    this.setState({ currView: 'Inbox' });
                }}>
                    <NavLink exact to='/email'> Inbox</NavLink>
                    <span title="Unread Emails" className="unread-count">
                        ({this.props.unReadEmails().length})
                    </span>
                </li>
                <li className={`${this.checkClassActive('Important')} email-nav-link`} onClick={() => {
                    this.props.updateCurrView('Important');
                    this.setState({ currView: 'Important' });
                }}>
                    <NavLink exact to='/email'> Important</NavLink>
                </li>
                <li className={`${this.checkClassActive('Sent')} email-nav-link`} onClick={() => {
                    this.props.updateCurrView('Sent');
                    this.setState({ currView: 'Sent' });
                }}>
                    <NavLink exact to='/email'> Sent</NavLink>
                </li>
            </ul>
        </aside>)
    }
}