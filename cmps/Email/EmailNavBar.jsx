// const { NavLink } = ReactRouterDOM
const { NavLink } = ReactRouterDOM


export default function EmailNavBar(props) {

    // activeClassName="email-link-active"
    return (<aside className="email-nav-container">
        <ul className="email-nav-links clean-list flex column">
            <li className="email-nav-link" onClick={() => {
                props.updateCurrView('Inbox');
            }}>
               <NavLink  exact to='/email'> Inbox</NavLink>
                <span title="Unread Emails" className="unread-count">
                    {props.unReadCount}
                </span>
            </li>
            <li className="email-nav-link" onClick={() => {
                props.updateCurrView('Important');
            }}>
                <NavLink exact to='/email'> Important</NavLink>
            </li>
            <li className="email-nav-link" onClick={() => {
                props.updateCurrView('Sent');
            }}>
                <NavLink exact to='/email'> Sent</NavLink>
            </li>
        </ul>
    </aside>)
}