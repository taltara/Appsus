const { NavLink } = ReactRouterDOM;
import { UserMsg } from './UserMsg.jsx';

export function NavBar(props) {


    return (

        <nav className="app-nav flex space-between align-center">
            <span><NavLink exact to='/'><span className="logo-text">Miss</span><img src="../assets/img/logo.png" className="main-logo" /><span className="logo-text">Book</span></NavLink></span>
            <UserMsg></UserMsg>
            <span className="nav-links-span flex align-center space-between">
                <p className="navlink-collection navlink"><NavLink exact to='/books'>Books</NavLink></p>
                <p className="navlink-collection navlink"><NavLink exact to='/keep'>Keep</NavLink></p>
                <p className="navlink-collection navlink"><NavLink exact to='/email'>Email</NavLink></p>
                <p className="navlink-about navlink"><NavLink exact to='/about'>About</NavLink></p>
            </span>
        </nav>
    );

} 