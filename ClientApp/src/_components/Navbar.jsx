import React, { Component } from 'react'
import { NavLink,Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Navbar extends Component{
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout(e) {

    }


    render(){
        return(
            <ul>
                <li>Home</li>
                <li><NavLink to="costumes">Costumes</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
            </ul>
        )

    }
}

function mapStateToProps(state) {

}

const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar };

export default Navbar;