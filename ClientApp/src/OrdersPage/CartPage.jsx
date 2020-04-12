import React from 'react';
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
            <div>
                Košík
            </div>
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