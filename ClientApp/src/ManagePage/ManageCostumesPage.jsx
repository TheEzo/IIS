import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {costumesActions, userActions} from "../_actions";
import {Loader} from "../_components";

import {Datatable} from "@o2xp/react-datatable";
import {faTrashAlt, faUserCog} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
                colSize: "15px",
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
            <a href="#" onClick={() => dispatch(costumesActions.setEdit(id))}>
                <FontAwesomeIcon icon={faUserCog}/>
            </a>
            <a href="#" onClick={() => dispatch(costumesActions.delete(id))}>
                <FontAwesomeIcon className="red" icon={faTrashAlt}/>
            </a>
        </Fragment>
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
        return (loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <h2>Počet kostýmů: {items.length}</h2>
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