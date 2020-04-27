const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
const history = History.createBrowserHistory();


import { Home } from 'pages/Home.jsx';
import { BookApp } from 'pages/Books/BookApp.jsx';
import { BookDetails } from 'pages/Books/BookDetails.jsx';
import { NavBar } from 'cmps/NavBar.jsx';
import { About } from 'pages/About.jsx';
import { MissKeep } from 'pages/Keep/MissKeep.jsx';
import { EmailApp } from 'pages/Email/EmailApp.jsx';
import { EmailDetails } from 'pages/Email/EmailDetails.jsx';

// CHANGE TO 'KEEPAPP' & 'EMAILAPP'// CHANGE TO 'KEEPAPP' & 'EMAILAPP'

// import { CSSTransition, TransitionGroup } from 'lib/react-transition-group.js';

export class App extends React.Component {

    render() {
        return (
            <Router history={history}>
                <NavBar></NavBar>
                    <Switch>
                        <Route component={BookDetails} path="/books/:bookName/:bookId" />
                        <Route component={BookApp} path="/books" />
                        <Route component={MissKeep} path="/keep" />
                        <Route component={EmailApp} path="/email" />
                        <Route component={About} path="/about" />
                        <Route component={Home} path="/" />
                    </Switch>
            </Router>
        )
    }
}

