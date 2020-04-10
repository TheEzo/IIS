import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

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
                    <NavLink className='navbar-brand' to='/home'>Home</NavLink>
                    <NavbarToggler onClick={() => {
                    }}/>
                    <UncontrolledCollapse toggler={[]} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink className='nav-link' to="/costumes">Kostýmy</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className='nav-link' to="/accessories">Doplňky</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                            {!loggedIn && <LoginBar />}
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

