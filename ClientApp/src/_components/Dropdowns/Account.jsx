import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import React from "react";
import {NavLink} from "react-router-dom";

const AccountDropdown = () => (
    <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
            Účet
        </DropdownToggle>

        <DropdownMenu right>
            <DropdownItem disabled>
                <span>TODO: Jméno uživatele</span>
            </DropdownItem>
            <DropdownItem divider/>
            <DropdownItem>
                <NavLink className='black-text' to='/profile'>Profil</NavLink>
            </DropdownItem>
            <DropdownItem>
                <NavLink className='black-text' to='/orderHistory'>Moje objednávky</NavLink>
            </DropdownItem>
            <DropdownItem divider/>
            <DropdownItem>
                <NavLink className='black-text' to='/login'>Odhlásit</NavLink>
            </DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
)

export default AccountDropdown;