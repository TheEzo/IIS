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
            width: "1500px",
        },
    },
    data: {
        columns: [
            {
                id: "name",
                label: "Kostým",
                colSize: "100px",
            },
            {
                id: "manufacturer",
                label: "Výrobce",
                colSize: "80px",
            },
            {
                id: "material",
                label: "Materiál",
                colSize: "50px",
            },
            {
                id: "size",
                label: "Velikost",
                colSize: "20px"
            },
            {
                id: "count",
                label: "Počet kusů",
                colSize: "20px"
            },
            {
                id: "price",
                label: "Cena",
                colSize: "20px"
            },
            {
                id: "color",
                label: "Barva",
                colSize: "80px"
            },
            {
                id: "wear_level",
                label: "Opotřebení",
                colSize: "50px"
            },
            {
                id: "action",
                label: "Akce",
                dataType: "action",
                colSize: "160px",
            }
        ],
        rows: data.map((d) => ({
            name: d.name,
            manufacturer: d.manufacturer,
            material: d.material,
            size: d.size,
            count: d.count,
            price: d.price,
            color: d.color,
            wear_level: d.wear_level,
            action: d.id,
        }))
    }
});

const createCustomDataTypes = (dispatch) => [
    {
        dataType: "action",
        component: id => <Fragment>
            <button onClick={() => dispatch(costumesActions.setEdit(id))} className="btn btn-primary">Editovat</button>
            <button onClick={() => dispatch(null)} className="btn btn-danger">Odstranit</button>
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
                    <h3>Počet kostýmů: {items.length}</h3>
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