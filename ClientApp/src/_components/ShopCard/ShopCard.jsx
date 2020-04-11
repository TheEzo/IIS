import React, {Component} from 'react';
import {config} from "../../_helpers";

class ShopCard extends Component {

    render() {
        const item = this.props.item;
        const loggedIn = this.props.loggedIn;

        return (
            <div className="item">
                <div className="item-image">
                    <img src={config.apiUrl + item.image} alt="" />
                </div>
                <div className="item-body">
                    <div className="item-header">{ item.name } ({item.size})</div>
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
                        <button className="btn btn-success" disabled={!loggedIn}>Do košíku</button>
                    </div>
                </div>
            </div>
        )
    }
}

export {ShopCard};