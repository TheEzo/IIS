import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {costumesActions} from "../_actions/costumes.actions";
import {Costume} from "../_components/Costume";

class CostumesPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(costumesActions.getAll());
    }

    render() {
        const {costumes} = this.props;
        return (
            <div className="col-md-12 col-md-offset-3">
                <h1>Costumes page</h1>
                <h3>All available costumes:</h3>
                {costumes.map((c) => (<Costume key={c.id} costume={c}/>))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {items} = state.costumes;
    return {
        costumes: items
    };
}

const connectedCostumesPage = connect(mapStateToProps)(CostumesPage);
export {connectedCostumesPage as CostumesPage};