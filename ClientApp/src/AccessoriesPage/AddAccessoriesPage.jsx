import React from 'react';
import {connect} from 'react-redux';

import {userActions} from "../_actions";

class AddAccessoriePage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());
    }

    render() {
        return (
            <div className="col-md-12 col-md-offset-3">
                <h1>Přidat nový doplněk</h1>
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

export default connect(mapStateToProps)(AddAccessoriePage);
