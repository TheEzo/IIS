import React, {Component} from 'react';

class ShopCard extends Component {

    render() {
        //console.log(this.props.item);
        const item = this.props.item;

        return (
            <div>
                <p>{item.name}</p>
            </div>
        )
    }
}

export {ShopCard};