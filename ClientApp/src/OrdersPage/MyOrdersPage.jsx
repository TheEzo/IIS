import React from 'react';
import {connect} from 'react-redux';

import {orderActions, userActions} from "../_actions";
import {Loader} from "../_components";

class MyOrdersPage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());
    }

    componentDidMount() {
        this.props.dispatch(orderActions.getMine());
    }

    render() {
        const {myOrders = [], loading} = this.props;
        console.log("Loading: ", loading);
        return (loading ? (
                <Loader/>
            ) : (
                <h1>Počet objednávek {myOrders.length}</h1>
            )
        );
    }
}

function mapStateToProps(state) {
    const {loading, myOrders} = state.orders;
    const {loggedIn} = state.authentication;
    return {
        loading,
        myOrders,
        loggedIn,
    }
}

export default connect(mapStateToProps)(MyOrdersPage)