import React, {Component} from 'react';

class Costume extends Component {
    //constructor(props) {
    //    super(props);
    //}

    render() {
        console.log(this.props.costume);
        const costume = this.props.costume;

        return (
            <div>
                <p>{costume.name}</p>
            </div>
        )
    }
}

export {Costume};