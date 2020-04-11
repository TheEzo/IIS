import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {orderActions, userActions} from "../_actions";
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
                id: "name",
                label: "Název akce",
                colSize: '55px'
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
        ],
        rows: data.map((d) => ({
            name: d.name,
            date_from: d.date_from,
            date_to: d.date_to,
            costumes: d.costumes,
            accessories: d.accessories,
            price: d.price,
            returned: d.returned ? "Ano" : "Ne"
        }))
    }
});


class MyOrdersPage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());
    }

    componentDidMount() {
        this.props.dispatch(orderActions.getMine());
    }

    render() {
        const {myOrders = [], loading, dispatch} = this.props;

        return (loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <h3>Počet objednávek: {myOrders.length}</h3>
                    <Datatable
                        options={getOptions(myOrders)}
                    />
                </Fragment>
            )
        );
    }
}

function mapStateToProps(state) {
    const {loading, myOrders} = state.orders;
    const {loggedIn} = state.authentication;
    return {
        loading,
        myOrders,
        loggedIn,
    }
}

export default connect(mapStateToProps)(MyOrdersPage)