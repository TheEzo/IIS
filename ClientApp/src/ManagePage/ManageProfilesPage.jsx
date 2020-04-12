import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {userActions} from "../_actions";
import {Loader} from "../_components";

import {Datatable} from "@o2xp/react-datatable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCog, faTrashAlt} from '@fortawesome/free-solid-svg-icons'

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
                label: "Jméno",
                colSize: "60px",
            },
            {
                id: "surname",
                label: "Příjmení",
                colSize: "80px",
            },
            {
                id: "email",
                label: "Email",
                colSize: "150px",
            },
            {
                id: "city",
                label: "Město",
                colSize: "50px",
            },
            {
                id: "address",
                label: "Adresa",
                colSize: "100px",
            },
            {
                id: "tel_number",
                label: "Tel.",
                colSize: "60px",
            },
            {
                id: "membership",
                label: "Členství",
                colSize: "60px",
            },
            {
                id: "position",
                label: "Pozice",
                colSize: "60px",
            },
            {
                id: "action",
                label: "Akce",
                colSize: "15px",
                dataType: "action",
            }
        ],
        rows: data.map((d) => ({
            name: d.name,
            surname: d.surname,
            email: d.email,
            city: d.city,
            address: d.address + " " + d.addr_num,
            tel_number: d.tel_number,
            membership: membershipMap[d.membership],
            position: positionMap[d.position],
            action: d.id,
        }))

    }
});

const membershipMap = {
    zlate: "Zlaté",
    stribrne: "Stříbrné",
    bronzove: "Bronzové"
}
const positionMap = {
    vedouci: "Vedoucí",
    zamestnanec: "Zaměstnanec",
    null: "Zákazník"
}

const createCustomDataTypes = (dispatch) => [
    {
        dataType: "action",
        component: id => <Fragment>
            {/*TODO zmenit akci na edit*/}
            <a href="#" onClick={() => dispatch(userActions.delete(id))}><FontAwesomeIcon icon={faUserCog}/></a>
            <a href="#" onClick={() => dispatch(userActions.delete(id))} className="red">
                <FontAwesomeIcon icon={faTrashAlt}/>
            </a>
        </Fragment>,
    }
]


class ManageProfilesPage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    render() {
        const {items = [], loading, dispatch} = this.props;


        console.log("Loading: ", loading);

        return (loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <h2>Počet uživatelů {items.length}</h2>
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
    const {items, loading} = state.users;
    const {loggedIn} = state.authentication;
    return {
        loading,
        items,
        loggedIn,
    }
}

export default connect(mapStateToProps)(ManageProfilesPage)