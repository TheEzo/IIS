import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import React from "react";
import {NavLink} from "react-router-dom";

const AccountDropdown = () => (
    <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
            Admin
        </DropdownToggle>

        <DropdownMenu right>
            <DropdownItem disabled>
                <span>Administrace</span>
            </DropdownItem>
            <DropdownItem divider/>
            <DropdownItem>
                <NavLink className='black-text' to='/addCostume'>Přidat kostýmy</NavLink>
            </DropdownItem>
            <DropdownItem>
                <NavLink className='black-text' to='/addAccessorie'>Přidat doplňky</NavLink>
            </DropdownItem>
            <DropdownItem divider/>
            <DropdownItem>
                <NavLink className='black-text' to='/adminCostumes'>Spravovat kostýmy</NavLink>
            </DropdownItem>
            <DropdownItem>
                <NavLink className='black-text' to='/adminAccessories'>Spravovat doplňky</NavLink>
            </DropdownItem>
            <DropdownItem>
                <NavLink className='black-text' to='/adminOrders'>Spravovat objednávky</NavLink>
            </DropdownItem>
            <DropdownItem divider/>
            <DropdownItem>
                <NavLink className='black-text' to='/adminUsers'>Spravovat uživatele</NavLink>
            </DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
)

export default AccountDropdown;