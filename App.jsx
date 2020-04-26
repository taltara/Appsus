const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
const history = History.createBrowserHistory();

import { Home } from 'pages/Home.jsx';
import { BookApp } from 'pages/Books/BookApp.jsx';
import { BookDetails } from 'pages/Books/BookDetails.jsx';
import { NavBar } from 'cmps/NavBar.jsx';
import { About } from 'pages/About.jsx';
import { MissKeep } from 'pages/Keep/MissKeep.jsx';
import { MisterEmail } from 'pages/Email/MisterEmail.jsx';

// import { CSSTransition, TransitionGroup } from 'lib/react-transition-group.js';

export class App extends React.Component {

    render() {
        return (
            <Router>
                <NavBar></NavBar>
                <div>

                    <Switch>
                        <Route history={history} component={BookDetails} path="/books/:bookName/:bookId" />
                        <Route component={BookApp} path="/books" />
                        <Route component={MissKeep} path="/keep" />
                        <Route component={MisterEmail} path="/email" />
                        <Route component={About} path="/about" />
                        <Route component={Home} path="/" />
                    </Switch>

                </div>
            </Router>
        )
    }
}

