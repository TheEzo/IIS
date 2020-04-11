import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {costumesActions, orderActions, userActions} from "../_actions";
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
                id: "customer",
                label: "Zákazník",
                colSize: '90px'
            },
            {
                id: "name",
                label: "Název akce",
                colSize: '80px'
            },
            {
                id: "date_from",
                label: "Datum vypůjčení",
                colSize: '40px'
            },
            {
                id: "date_to",
                label: "Platnost vypůjčky",
                colSize: '40px'
            },
            {
                id: "costumes",
                label: "Kostýmy",
                colSize: '200px'
            },
            {
                id: "accessories",
                label: "Doplňky",
            },
            {
                id: "price",
                label: "Cena",
                colSize: '20px'
            },
            {
                id: "returned",
                label: "Vráceno",
                colSize: '20px'
            },
            {
                id: "action",
                label: "action",
                colSize: "60px",
                dataType: "action",
            }
        ],
        rows: data.map((d) => ({
            customer: d.user.name + ' ' + d.user.surname,
            name: d.name,
            date_from: d.date_from,
            date_to: d.date_to,
            costumes: d.costumes.join(', '),
            accessories: d.accessories.join(', '),
            price: d.price,
            returned: d.returned ? "Ano" : "Ne",
            action: d.id,
        }))

    }
});

const createCustomDataTypes = (dispatch) => [
    {
        dataType: "action",
        component: id => <Fragment>
            <button onClick={() => dispatch(null)}>Vráceno</button>
        </Fragment>,
    }
]


class ManageOrdersPage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());
    }

    componentDidMount() {
        this.props.dispatch(orderActions.getAll());
    }

    render() {
        const {allOrders = [], loading, dispatch} = this.props;


        console.log("Loading: ", loading);



        return (loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <h1>Počet objednávek: {allOrders.length}</h1>
                    <Datatable
                        options={getOptions(allOrders)}
                        customDataTypes={createCustomDataTypes(dispatch)}
                    />
                </Fragment>
            )
        );
    }
}

function mapStateToProps(state) {
    const {loading, allOrders} = state.orders;
    const {loggedIn} = state.authentication;
    return {
        loading,
        loggedIn,
        allOrders,
    }
}

export default connect(mapStateToProps)(ManageOrdersPage)