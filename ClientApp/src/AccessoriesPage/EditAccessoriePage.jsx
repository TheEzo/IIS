import React from 'react';
import {connect} from 'react-redux';

import {accessoriesActions, userActions} from "../_actions";
import {history} from "../_helpers";
import {Link} from "react-router-dom";

class EditAccessoriePage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());

        this.state = {
            user: this.props.editing,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params) {
            const {id} = this.props.match.params;
            this.props.dispatch(accessoriesActions.setEdit(id));
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({submitted: true});
        const {user} = this.state;
        const {dispatch} = this.props;
        dispatch(accessoriesActions.edit(user));
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;

        if (name === "image") {
            this.setState({
                user: {
                    ...user,
                    [name]: event.target.files[0],
                }
            })
        }else {
            this.setState({
                user: {
                    ...user,
                    [name]: value
                }
            });
        }
    }

    render() {
        if (this.state.user == null) {
            history.push("/adminAccessories");
        }

        const item = this.state.user;

        return (
            <div className="col-md-12 col-md-offset-3">
                <h2>Upravit doplněk {item && item.id}</h2>
                <form name="form" onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="name">Jméno</label>
                            <input type="text" className="form-control" name="name" value={item && item.name}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-sm-6">
                            <label htmlFor="manufacturer">Výrobce</label>
                            <input type="text" className="form-control" name="manufacturer"
                                   value={item && item.manufacturer}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <label htmlFor="description">Popis</label>
                            <input type="text" className="form-control" name="description"
                                   value={item && item.description}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-3">
                            <label htmlFor="count">Počet kusů</label>
                            <input type="number" className="form-control" name="count" value={item && item.count}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-sm-3">
                            <label htmlFor="price">Cena</label>
                            <input type="number" className="form-control" name="price" value={item && item.price}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-sm-3">
                            <label htmlFor="size">Velikost</label>
                            <select name="size" onChange={this.handleChange} className="form-control">
                                <option selected={item && item.size === 'S'} value="S">S</option>
                                <option selected={item && item.size === 'M'} value="M">M</option>
                                <option selected={item && item.size === 'L'} value="L">L</option>
                                <option selected={item && item.size === 'XL'} value="XL">XL</option>
                                <option selected={item && item.size === 'XXL'} value="XXL">XXL</option>
                                <option selected={item && item.size === 'XXXL'} value="XXXL">XXXL</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-3">
                            <label htmlFor="image">Obrázek</label>
                            <input type="file" className="form-control" name="image"
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-4">
                            <label htmlFor="color">Barva</label>
                            <input type="text" className="form-control" name="color" value={item && item.color}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-sm-4">
                            <label htmlFor="material">Materiál</label>
                            <input type="text" className="form-control" name="material" value={item && item.material}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-sm-4">
                            <label htmlFor="wear_level">Opotřebení</label>
                            <select name="wear_level" onChange={this.handleChange} className="form-control">
                                <option selected={item && item.wear_level === 'nove'} value="nove">Nové</option>
                                <option selected={item && item.wear_level === 'zanovni'} value="zanovni">Zánovní</option>
                                <option selected={item && item.wear_level === 'stare'} value="stare">Staré</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <input type="submit" value="Odeslat" className="btn btn-success"/>
                        <Link to="/adminAccessories" className="btn btn-link">Zrušit</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {loggedIn} = state.authentication;
    const {editing} = state.accessories;
    return {
        loggedIn,
        editing,
    };
}

export default connect(mapStateToProps)(EditAccessoriePage);
