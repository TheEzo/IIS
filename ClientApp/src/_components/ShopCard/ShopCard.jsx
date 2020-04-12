import React, {Component} from 'react';
import {config} from "../../_helpers";
import {connect} from 'react-redux';
import {orderActions} from "../../_actions/orders.actions";

class ShopCard extends Component {
    constructor(props) {
        super(props);

        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(id, type) {
        console.log("Id:", id, "Type: ", type, "Action: ", "add");
        const {dispatch} = this.props;
        dispatch(orderActions.addToCart(id, this.props.type, "add"));
    }

    render() {
        const item = this.props.item;
        const type = this.props.type;
        const loggedIn = this.props.loggedIn;

        return (
            <div className="item">
                <div className="item-image">
                    <img src={config.apiUrl + item.image} alt=""/>
                </div>
                <div className="item-body">
                    <div className="item-header">{item.name} ({item.size})</div>
                    <div>
                        <dl>
                            <dt>Počet kusů:</dt>
                            <dd>{item.count}</dd>
                            <dt>Barva:</dt>
                            <dd>{item.color}</dd>
                            <dt>Materiál:</dt>
                            <dd>{item.material}</dd>
                            <dt>Výrobce:</dt>
                            <dd>{item.manufacturer}</dd>
                        </dl>
                    </div>
                </div>
                <div className="item-description">
                    <div className="description">
                        {item.description}
                    </div>
                    <div className="item-rent">
                        <span>{item.price}/den</span>
                        <button onClick={() => this.handleAdd(item.id, type)} className="btn btn-success" disabled={!loggedIn}>Do košíku</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {loggedIn} = state.authentication;
    return {
        loggedIn,
    }
}

export default connect(mapStateToProps)(ShopCard);