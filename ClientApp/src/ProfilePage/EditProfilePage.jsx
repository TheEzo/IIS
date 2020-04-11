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
                <div className="col-md-12">
                    <h2>Editace profilu</h2>
                    <form name="form" onSubmit="TODO">
                        <div className="row">
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="id">Rodné číslo</label>
                                <input type="text" className="form-control" name="id" value={profile.id}
                                       onChange="" disabled />
                            </div>
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="name">Jméno</label>
                                <input type="text" className="form-control" name="name" value={profile.name}
                                       onChange="" />
                            </div>
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="surname">Příjmení</label>
                                <input type="text" className="form-control" name="surname" value={profile.surname}
                                       onChange="" />
                            </div>
                        </div>
                        <div className="row">
                            <div className={'form-group col-sm-6'}>
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" name="email" value={profile.email}
                                       onChange="" />
                            </div>
                            <div className={'form-group col-sm-6'}>
                                <label htmlFor="tel_number">Telefonní číslo</label>
                                <input type="text" className="form-control" name="tel_number" value={profile.tel_number}
                                       onChange="" />
                            </div>
                        </div>
                        <div className="row">
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="city">Město</label>
                                <input type="text" className="form-control" name="city" value={profile.city}
                                       onChange="" />
                            </div>
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="address">Ulice</label>
                                <input type="text" className="form-control" name="address" value={profile.address}
                                       onChange="" />
                            </div>
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="addr_num">Číslo popisné</label>
                                <input type="text" className="form-control" name="addr_num" value={profile.addr_num}
                                       onChange="" />
                            </div>
                        </div>
                        <div className="row">
                            <input type="submit" value="Odeslat" className="btn btn-success" />
                            <Link to="/profile" className="btn btn-link">Zrušit</Link>
                        </div>
                    </form>
                </div>
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