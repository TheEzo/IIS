import React, {Fragment} from "react";
import {connect} from "react-redux";
import {userActions} from "../_actions";
import {Loader} from "../_components";

import {Link} from "react-router-dom";

class EditProfilePage extends React.Component {
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

        return (profileLoading ? (
                <Loader />
            ) : (
                <Fragment>
                    <h1>Edit profilu uživatele {profile && profile.name}</h1>
                    <p>{profileLoading}</p>
                    <p>{profile && profile.id}</p>
                    <Link to="/profile">Uložit změny (zatím nefunguje, až bude připraveno)</Link>
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

export default connect(mapStateToProps)(EditProfilePage);