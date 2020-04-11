import React from 'react';
import {connect} from 'react-redux';

import {userActions} from "../_actions";

class AddCostumePage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());
    }

    render() {
        return (
            <div className="col-md-12 col-md-offset-3">
                <h2>Přidat nový kostým</h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {loggedIn} = state.authentication;
    return {
        loggedIn,
    };
}

export default connect(mapStateToProps)(AddCostumePage);
