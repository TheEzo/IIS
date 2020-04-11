import React, {Component} from 'react';

class ShopCard extends Component {

    render() {
        const item = this.props.item;
        const loggedIn = this.props.loggedIn;

        console.log("Karta: ", item);
        console.log("Prihlsen: ", loggedIn);

        return (
            <div>
                <p>{item.name}</p>
            </div>
        )
    }
}

export {ShopCard};