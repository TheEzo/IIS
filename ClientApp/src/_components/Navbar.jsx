import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    //NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    //NavbarText
    UncontrolledCollapse,

} from 'reactstrap';
import {AccountDropdown, AdministrationDropdown} from "./index";

class MyNavbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {

    }

    render() {
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
                            <AdministrationDropdown />
                            <AccountDropdown />
                        </Nav>

                    </UncontrolledCollapse>
                </Navbar>
            </div>
        );
    }

    // render() {
    //     const loggedin = this.props.loggedIn;
    //     console.log("LoggedIn: ", loggedin);
    //     return (
    //         <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    //             <NavLink className='navbar-brand' to='/home'>Home</NavLink>
    //             <div className='collapse navbar-collapse' id='navbarNav'>
    //                 <ul className='navbar-nav mr-auto'>
    //                     <li className='nav-item'>
    //                         <NavLink className='nav-link' to="/costumes">Kostýmy</NavLink>
    //                     </li>
    //                     <li className='nav-item'>
    //                         <NavLink className='nav-link' to="/accessories">Doplňky</NavLink>
    //                     </li>
    //                 </ul>
    //                 {loggedin ? (
    //                     <ul className='navbar-nav'>
    //                         <li className='nav-item'>
    //                             <NavLink className='nav-link' to="/#">Košík</NavLink>
    //                         </li>
    //                         <li className="nav-item dropdown">
    //                             <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
    //                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //                                 Dropdown link
    //                             </a>
    //                             <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
    //                                 <a className="dropdown-item" href="#">Action</a>
    //                                 <a className="dropdown-item" href="#">Another action</a>
    //                                 <a className="dropdown-item" href="#">Something else here</a>
    //                             </div>
    //                         </li>
    //                     </ul>
    //                 ) : (
    //                     <ul className='navbar-nav'>
    //                         <li className='nav-item'>
    //                             <NavLink className='nav-link' to="/login">Přihlášení</NavLink>
    //                         </li>
    //                         <li className='nav-item'>
    //                             <NavLink className='nav-link' to="/register">Registrace</NavLink>
    //                         </li>
    //                     </ul>
    //                 )}
    //             </div>
    //         </nav>
    //     )
    //
    // }
}

function mapStateToProps(state) {
    const {loggedIn} = state.authentication;
    return {
        loggedIn
    };
}

export default connect(mapStateToProps)(MyNavbar);

