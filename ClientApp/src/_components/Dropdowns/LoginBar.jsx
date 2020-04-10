import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown} from "reactstrap";
import React, {Fragment} from "react";
import {NavLink} from "react-router-dom";

const AccountDropdown = () => (
    <Fragment>
        <NavItem>
            <NavLink className='nav-link' to="/login">Přihlásit</NavLink>
        </NavItem>
        <NavItem>
            <NavLink className='nav-link' to="/register">Registrovat</NavLink>
        </NavItem>
    </Fragment>
)

export default AccountDropdown;