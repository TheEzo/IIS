import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee, faShoppingCart} from '@fortawesome/free-solid-svg-icons'

import {
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledCollapse,

} from 'reactstrap';
import {AccountDropdown, AdministrationDropdown, LoginBar} from "./index";

class MyNavbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {

    }

    render() {
        const {loggedIn, admin} = this.props;
        return (
            <div>
                <Navbar color="dark" dark expand="md" fixed={"top"}>
                    <NavLink className='navbar-brand' to='/home'>Půjčovna kostýmů</NavLink>
                    <NavbarToggler id="togg1" onClick={() => {
                    }}/>
                    <UncontrolledCollapse toggler={"togg1"} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink className='nav-link' to="/costumes">Kostýmy</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to="/accessories">Doplňky</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            {loggedIn && (
                                <NavItem className="chart-parent">
                                    <NavLink to="/cart" className="chart-style">
                                        <FontAwesomeIcon icon={faShoppingCart}/>
                                    </NavLink>
                                </NavItem>
                            )}
                            {!loggedIn && <LoginBar/>}
                            {loggedIn && admin && <AdministrationDropdown/>}
                            {loggedIn && <AccountDropdown/>}

                        </Nav>

                    </UncontrolledCollapse>
                </Navbar>
            </div>
        );
    }


}

function mapStateToProps(state) {
    const {loggedIn, user} = state.authentication;
    return {
        loggedIn: loggedIn,
        admin: user && user.admin,
    };
}

export default connect(mapStateToProps)(MyNavbar);

