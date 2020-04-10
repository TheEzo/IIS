import React from 'react';
import {connect} from 'react-redux';

import {costumesActions} from "../_actions/costumes.actions";
import {ShopCard} from "../_components/ShopCard/ShopCard";

class CostumesPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(costumesActions.getAll());
    }

    render() {
        const {loading, costumes} = this.props;

        return (
            <div className="col-md-12 col-md-offset-3">
                <h1>Kostýmy</h1>
                <h3>{loading ? "Načítám data" : "Dostupné kostýmy"}</h3>
                {loading ? "" : costumes.map((c) => (<ShopCard key={c.id} item={c}/>))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {items, loading, error} = state.costumes;
    return {
        costumes: items,
        loading,
        error,
    };
}

const connectedCostumesPage = connect(mapStateToProps)(CostumesPage);
export {connectedCostumesPage as CostumesPage};