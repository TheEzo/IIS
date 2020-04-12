import React, {Fragment} from "react";
import {connect} from "react-redux";
import {userActions} from "../_actions";
import {Loader} from "../_components";

import {Link} from "react-router-dom";
import {history} from "../_helpers";

class EditProfilePage extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.loggedIn) {
            const id = this.props.user.id;
            this.props.dispatch(userActions.getProfile(id));
        } else {
            this.props.dispatch(userActions.logout());
        }

        console.log("Profile: ", this.props.profile);
        this.state = {
            user: this.props.profile,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        console.log("Handle submit");
        event.preventDefault();

        this.setState({submitted: true});
        const {user} = this.state;
        const {dispatch} = this.props;
        dispatch(userActions.edit(user));
    }

    render() {
        if (this.state.user == null) {
            history.push("/profile");
        }

        const {profileLoading} = this.props;
        const {user} = this.state;
        return (profileLoading ? (
                <Loader/>
            ) : (
                <div className="col-md-12">
                    <h2>Editace profilu</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="id">Rodné číslo</label>
                                <input type="text" className="form-control" name="id" value={user.id}
                                       onChange={this.handleChange} disabled/>
                            </div>
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="name">Jméno</label>
                                <input type="text" className="form-control" name="name" value={user.name}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="surname">Příjmení</label>
                                <input type="text" className="form-control" name="surname" value={user.surname}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className={'form-group col-sm-6'}>
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" name="email" value={user.email}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className={'form-group col-sm-6'}>
                                <label htmlFor="tel_number">Telefonní číslo</label>
                                <input type="text" className="form-control" name="tel_number" value={user.tel_number}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="city">Město</label>
                                <input type="text" className="form-control" name="city" value={user.city}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="address">Ulice</label>
                                <input type="text" className="form-control" name="address" value={user.address}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className={'form-group col-sm-4'}>
                                <label htmlFor="addr_num">Číslo popisné</label>
                                <input type="text" className="form-control" name="addr_num" value={user.addr_num}
                                       onChange={this.handleChange}/>
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