import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {userActions} from "../../_actions";

const AccountDropdown = ({username, dispatch}) => (
    <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
            Účet
        </DropdownToggle>

        <DropdownMenu right>
            <DropdownItem disabled>
                <span>{username}</span>
            </DropdownItem>
            <DropdownItem divider/>
            <DropdownItem>
                <NavLink className='black-text' to='/profile'>Uživatelský profil</NavLink>
            </DropdownItem>
            <DropdownItem>
                <NavLink className='black-text' to='/orderHistory'>Moje objednávky</NavLink>
            </DropdownItem>
            <DropdownItem divider/>
            <DropdownItem >
                {/*<NavLink onClick={() => dispatch(userActions.logout())} className='black-text' to='/login'>Odhlásit se</NavLink>*/}
                <NavLink className='black-text' to='/login'>Odhlásit se</NavLink>
            </DropdownItem>
        </DropdownMenu>
    </UncontrolledDropdown>
)

function mapStateToProps(state) {
    const {user} = state.authentication;
    return {
        username: user.name,
    };
}

export default connect(mapStateToProps)(AccountDropdown);