import React, {Component, Fragment} from 'react';
import {config} from "../../_helpers";
import {connect} from 'react-redux';
import {orderActions} from "../../_actions/orders.actions";

class ShopCard extends Component {
    constructor(props) {
        super(props);

        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(id, type, action) {
        const {dispatch} = this.props;
        dispatch(orderActions.addToCart(id, this.props.type, action));
    }

    render() {
        const item = this.props.item;
        const type = this.props.type;
        const loggedIn = this.props.loggedIn;
        const inCart = this.props.inCart;
        const isImage = (imgName) => imgName.includes('.');
        return (
            <div className="item">
                <div className="item-image">
                    {isImage(item.image) &&
                    <img src={config.apiUrl + item.image} alt=""/>
                    }
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
                        {inCart ? (
                            <Fragment>
                                <button
                                    onClick={() => this.handleAdd(item.id, type, "add")}
                                    className="btn btn-success"
                                    disabled={!loggedIn}
                                >Přidat další
                                </button>

                                <button
                                    onClick={() => this.handleAdd(item.id, type, "remove")}
                                    className="btn btn-danger"
                                    disabled={!loggedIn}
                                >Odebrat z košíku
                                </button>
                            </Fragment>
                        ) : (
                            <button
                                onClick={() => this.handleAdd(item.id, type, "add")}
                                className="btn btn-success"
                                disabled={!(!loggedIn || item.count > 0)}
                            >
                                Do košíku
                            </button>
                        )}
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