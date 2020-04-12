import React from 'react';

class HomePage extends React.Component {
    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Vítejte v půjčovně kostýmů</h1>
                <h2>Autoři:</h2>
                <h3>Bc. Šimon Pokorný</h3>
                <h3>Bc. Tomáš Willaschek</h3>
            </div>
        );
    }
}

export { HomePage };