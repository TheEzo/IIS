import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {costumesActions, userActions} from "../_actions";
import {Loader} from "../_components";

import {Datatable} from "@o2xp/react-datatable";

// https://github.com/o2xp/react-datatable
const getOptions = (data) => ({
    keyColumn: "id",
    dimensions: {
        datatable: {
            height: "500px",
            width: "100%",
        },
    },
    data: {
        columns: [
            {
                id: "id",
                label: "id",
                colSize: "80px",
                dataType: "text",
            },
            {
                id: "name",
                label: "name",
                colSize: "150px",
                dataType: "text",
            },
            {
                id: "age",
                label: "age",
                colSize: "50px",
                dataType: "text",
            },
            {
                id: "action",
                label: "action",
                colSize: "80px",
                dataType: "action",
            }
        ],
        rows: data.map((d) => ({
            id: d.id,
            name: d.id,
            age: d.id,
            action: d.id,
        }))

    }
});

const createCustomDataTypes = (dispatch) => [
    {
        dataType: "action",
        component: id => <Fragment>
            <button onClick={() => dispatch(null)}>Odstranit</button>
            <button onClick={() => dispatch(null)}>Odstranit</button>
        </Fragment>,
    }
]


class ManageCostumesPage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());
    }

    componentDidMount() {
        this.props.dispatch(costumesActions.getAll());
    }

    render() {
        const {items = [], loading, dispatch} = this.props;


        console.log("Loading: ", loading);

        return (loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <h1>Počet kostýmů: {items.length}</h1>
                    <Datatable
                        options={getOptions(items)}
                        customDataTypes={createCustomDataTypes(dispatch)}
                    />
                </Fragment>
            )
        );
    }
}

function mapStateToProps(state) {
    const {loading, items} = state.costumes;
    const {loggedIn} = state.authentication;
    return {
        loading,
        loggedIn,
        items,
    }
}

export default connect(mapStateToProps)(ManageCostumesPage)