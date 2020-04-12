import React from 'react';
import {connect} from 'react-redux';

import {accessoriesActions} from "../_actions";
import {Loader, ShopCard} from "../_components";

class AccessoriesPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(accessoriesActions.getAll());
    }

    render() {
        const {accessories, loading, loggedIn} = this.props;

        return (loading ? (
                <Loader/>
            ) : (
                <div className="col-md-12 col-md-offset-3">
                    <h1>Doplňky</h1>
                    <h3>{loading ? "Načítám data" : "Dostupné doplňky"}</h3>
                    {loading ? "" : accessories.map(a => <ShopCard key={a.id} type={"accessorie"} loggedIn={loggedIn} item={a}/>)}
                </div>
            )
        );
    }
}

function mapStateToProps(state) {
    const {items, loading, error} = state.accessories;
    const {loggedIn} = state.authentication;
    return {
        accessories: items,
        loading,
        error,
        loggedIn,
    };
}

export default AccessoriesPage = connect(mapStateToProps)(AccessoriesPage);
