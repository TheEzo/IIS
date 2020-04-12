import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {accessoriesActions, orderActions} from "../_actions";
import {ShopCard} from "../_components";
import {history} from "../_helpers";
import {Link} from "react-router-dom";

class CartContinuePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: {
                orderName: "",
                orderDate: "",
            },
            days: 1,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(orderActions.getCart());
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({submitted: true});
        const {order} = this.state;
        const {dispatch} = this.props;
        dispatch(orderActions.makeOrder(order));
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {order} = this.state;

        if (name === "orderDate") {
            const d1 = new Date(value);
            const d2 = new Date();

            const differenceInTime = d1.getTime() - d2.getTime();
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

            this.setState({
                ...this.state,
                days: differenceInDays,
            })
        }

        this.setState({
            order: {
                ...order,
                [name]: value
            }
        });
    }

    render() {
        const {price} = this.props.cart;
        const {days} = this.state;

        return (
            <Fragment>
                <h2>Dokončení rezervace</h2>
                <h4>Cena: {price * days} Kč</h4>
                <form name="form" onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <div className="row">
                        <div className="form-group col-sm-4">
                            <label htmlFor="color">Název akce</label>
                            <input
                                type="text"
                                className="form-control"
                                name="orderName"
                                value={this.state.order.orderName}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group col-sm-4">
                            <label htmlFor="material">Do kdy vypůjčit</label>
                            <input
                                type="date"
                                className="form-control"
                                name="orderDate"
                                value={this.state.order.orderDate}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <input type="submit" value="Odeslat" className="btn btn-success"/>
                        <Link to="/adminAccessories" className="btn btn-link">Zrušit</Link>
                    </div>
                </form>
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

export default connect(mapStateToProps)(CartContinuePage);