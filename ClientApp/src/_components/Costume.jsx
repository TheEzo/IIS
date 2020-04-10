import React, {Component} from 'react';

class Costume extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.costume);
        return (
            <div>
                <h2>Kostým</h2>
            </div>
        )
    }
}

export {Costume};