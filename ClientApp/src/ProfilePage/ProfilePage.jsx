import React, {Fragment} from "react";
import {connect} from "react-redux";
import {userActions} from "../_actions";
import {Loader} from "../_components";

import {Link} from "react-router-dom";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.loggedIn) {
            const id = this.props.user.id;
            this.props.dispatch(userActions.getProfile(id));
        }else{
            this.props.dispatch(userActions.logout());
        }
    }

    render() {
        console.log("Aktuální propsy: ", this.props);
        const {profileLoading, profile} = this.props;
        const pos = (pos) => (<Fragment><dt>Pozice:</dt><dd>{positionMap[pos]}</dd></Fragment>);
        const membershipMap = {
            zlate: "Zlaté",
            stribrne: "Stříbrné",
            bronzove: "Bronzové"
        }
        const positionMap = {
            vedouci: "Vedoucí",
        }
        return (profileLoading ? (
                <Loader />
            ) : (
                <Fragment>
                    <p>{profileLoading}</p>
                    <h2>Profil</h2>
                    <div className="col-sm-6">
                        <h5>Informace o uživateli</h5>
                        <dl>
                            <dt>Jméno:</dt>
                            <dd>{profile.name}</dd>
                            <dt>Příjmení:</dt>
                            <dd>{profile.surname}</dd>
                            <dt>Rodné číslo:</dt>
                            <dd>{profile.id}</dd>
                            <dt>Email:</dt>
                            <dd>{profile.email}</dd>
                            <dt>Telefon:</dt>
                            <dd>{profile.tel_number}</dd>
                            <dt>Ulice:</dt>
                            <dd>{profile.address + ', ' + profile.addr_num}</dd>
                            <dt>Obec:</dt>
                            <dd>{profile.city}</dd>
                        </dl>
                        <Link to="/editProfile" className="btn btn-primary">Upravit profil</Link>
                        <br/> <br/>
                    </div>
                    <div className="col-sm-6">
                        <h5>Další informace</h5>
                        <dl>
                            <dt>Členství:</dt>
                            <dd>{membershipMap[profile.membership]}</dd>
                            {pos(profile.position)}
                        </dl>
                    </div>

                </Fragment>
            )
        );
    }
}

function mapStateToProps(state) {
    const {user, loggedIn} = state.authentication;
    const {profile, profileLoading} = state.users;
    return {
        profile, profileLoading, user, loggedIn
    };
}

export default connect(mapStateToProps)(ProfilePage);