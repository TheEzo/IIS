import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {orderActions} from "../_actions";
import {ShopCard} from "../_components";
import {history} from "../_helpers";

class CartPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(orderActions.getCart());
    }

    render() {
        const {costumes = [], accessories = [], price} = this.props.cart;
        const {loggedIn} = this.props;
        const itemsInCart = [
            ...costumes.map(item => ({...item, type: "costumes"})),
            ...accessories.map(item => ({...item, type: "accessories"}))
        ];

        return (
            <Fragment>
                <h2>Nákupní košík</h2>
                <h4>Položek v košíku: {itemsInCart.length} | Cena: {price} Kč</h4>
                <button onClick={() => history.push("/cartContinue")} className="btn btn-info">Pokračovat v objednávce</button>
                {itemsInCart.map((item, idx) => (
                    <ShopCard
                        key={`${item.id}-${item.type}-${idx}`}
                        inCart
                        type={item.type}
                        loggedIn={loggedIn}
                        item={item}/>
                ))}
            </Fragment>

        );
    }
}

function mapStateToProps(state) {
    const {cart, loading} = state.orders;
    const {loggedIn} = state.authentication;
    return {
        cart,
        loading,
        loggedIn,
    }
}

export default connect(mapStateToProps)(CartPage);