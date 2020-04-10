import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {

    }

    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <NavLink className='navbar-brand' to='/home'>Home</NavLink>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to="/costumes">Kostýmy</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to="/accessories">Doplňky</NavLink>
                        </li>
                    </ul>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to="/login">Přihlášení</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to="/register">Registrace</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        )

    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Navbar);

