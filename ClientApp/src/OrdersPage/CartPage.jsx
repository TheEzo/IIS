import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {orderActions} from "../_actions";

class CartPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(orderActions.getCart());
    }

    render() {
        return (
            <Fragment>
                <h2>Nákupní košík</h2>
                <h4>Položek v košíku: </h4>
            </Fragment>

        );
    }
}

function mapStateToProps(state) {
    const {cart, loading} = state.orders;
    return {
        cart,
        loading,
    }
}

export default connect(mapStateToProps)(CartPage);