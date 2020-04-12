import React from 'react';
import {connect} from 'react-redux';

import {costumesActions, userActions} from "../_actions";
import {history} from "../_helpers";
import {Link} from "react-router-dom";

class EditCostumePage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());

        console.log("Editing costume: ", this.props.editing);
        this.state = {
            user: this.props.editing,
            submitted: false
        };
    }

    componentDidMount() {
        if (this.props.match.params) {
            const {id} = this.props.match.params;
            this.props.dispatch(costumesActions.setEdit(id));
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.name && user.surname && user.email && user.password) {
            dispatch(costumesActions.edit(user));
        }
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    render() {
        if (this.props.editing == null) {
            history.push("/adminCostumes");
        }

        const item = this.state.user;
        console.log("item: ", item);

        return (
            <div className="col-md-12 col-md-offset-3">
                <h2>Upravit kostým {item && item.id}</h2>
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
                            <input type="text" className="form-control" name="size" value={item && item.size}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className="form-group col-sm-3">
                            <label htmlFor="image">Obrázek</label>
                            <input type="file" className="form-control" name="image" value=""
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
                            <input type="text" className="form-control" name="wear_level"
                                   value={item && item.wear_level}
                                   onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <input type="submit" value="Odeslat" className="btn btn-success"/>
                        <Link to="/adminCostumes" className="btn btn-link">Zrušit</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {loggedIn} = state.authentication;
    const {editing} = state.costumes;
    return {
        loggedIn,
        editing,
    };
}

export default connect(mapStateToProps)(EditCostumePage);
