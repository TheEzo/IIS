import React, {Fragment} from "react";
import {userActions} from "../_actions";
import {history} from "../_helpers";
import {Loader} from "../_components";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class EditUserPage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());

        this.state = {
            user: this.props.editing,
            submitted: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params) {
            const {id} = this.props.match.params;
            this.props.dispatch(userActions.getProfile(id));
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({submitted: true});
        const {user} = this.state;
        const {dispatch} = this.props;
        dispatch(userActions.edit(user));
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

    render() {
        if (this.state.user == null) {
            history.push("/adminUsers");
        }

        const {profileLoading} = this.props;
        const {user} = this.state; //TODO: <<< TADY JSOU DATA, KTERÁ POTŘEBUJEŠ
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
                            <div className={'form-group col-sm-6'}>
                                <label htmlFor="position">Pozice</label>
                                <select name="position" onChange={this.handleChange} className="form-control">
                                    <option selected={user.position === null} value="zakaznik">Zákazník</option>
                                    <option selected={user.position === 'zamestnanec'} value="zamestnanec">Zaměstnanec</option>
                                    <option selected={user.position === 'vedouci'} value="vedouci">Vedoucí</option>
                                </select>
                            </div>
                            <div className={'form-group col-sm-6'}>
                                <label htmlFor="membership">Členství</label>
                                <select name="membership" onChange={this.handleChange} className="form-control">
                                    <option selected={user.membership === 'bronzove'} value="bronzove">Bronzové</option>
                                    <option selected={user.membership === 'stribrne'} value="stribrne">Stříbrné</option>
                                    <option selected={user.membership === 'zlate'} value="zlate">Zlaté</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <input type="submit" value="Odeslat" className="btn btn-success" />
                            <Link to="/adminUsers" className="btn btn-link">Zrušit</Link>
                        </div>
                    </form>
                </div>
            )
        );
    }


}

function mapStateToProps(state) {
    const {loggedIn} = state.authentication;
    const {editing} = state.users;
    return {
        loggedIn,
        editing,
    };
}

export default connect(mapStateToProps)(EditUserPage);