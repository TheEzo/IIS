import React from 'react';
import {connect} from 'react-redux';

import {costumesActions} from "../_actions";
import {Loader, ShopCard} from "../_components";

class CostumesPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(costumesActions.getAll());
    }

    render() {
        const {loading, costumes, loggedIn} = this.props;

        return (loading ? (
                <Loader/>
            ) : (
                <div className="col-md-12 col-md-offset-3">
                    <h1>Kostýmy</h1>
                    <h3>{loading ? "Načítám data" : "Dostupné kostýmy"}</h3>
                    {loading ? "" : costumes.map((c) => (<ShopCard key={c.id} type={"costumes"} loggedIn={loggedIn} item={c}/>))}
                </div>
            )
        );
    }
}

function mapStateToProps(state) {
    const {items, loading, error} = state.costumes;
    const {loggedIn} = state.authentication;
    return {
        costumes: items,
        loading,
        error,
        loggedIn,
    };
}

export default connect(mapStateToProps)(CostumesPage);
