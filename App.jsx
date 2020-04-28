const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
const history = History.createBrowserHistory();


import { Home } from 'pages/Home.jsx';
import { BookApp } from 'pages/Books/BookApp.jsx';
import { BookDetails } from 'pages/Books/BookDetails.jsx';
import { NavBar } from 'cmps/NavBar.jsx';
import { About } from 'pages/About.jsx';
import { NoteApp } from 'pages/Keep/NoteApp.jsx';
import { EmailApp } from 'pages/Email/EmailApp.jsx';
import { EmailDetails } from 'pages/Email/EmailDetails.jsx';
import {MessageCreateEmail} from 'cmps/Email/MessageCreateEmail.jsx'

// import { CSSTransition, TransitionGroup } from 'lib/react-transition-group.js';

export class App extends React.Component {

    render() {
        return (
            <Router history={history}>
                <NavBar></NavBar>
                <MessageCreateEmail/>
                    <Switch>
                        <Route component={BookDetails} path="/books/:bookName/:bookId" />
                        <Route component={BookApp} path="/books" />
                        <Route component={EmailApp} path="/email" />
                        <Route component={NoteApp} path="/keep" />
                        <Route component={About} path="/about" />
                        <Route component={Home} path="/" />
                    </Switch>

            </Router>
        )
    }
}

