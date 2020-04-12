import React from 'react';
import {connect} from 'react-redux';

import {userActions} from "../_actions";
import {Link} from "react-router-dom";

class AddCostumePage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());

        this.state = {
            user: {
                name: '',
                manufacturer: '',
                description: '',
                count: '',
                price: '',
                size: '',
                image: '',
                color: '',
                material: '',
                wear_level: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const item = null;
        return (
            <div className="col-md-12 col-md-offset-3">
                <h2>Přidat nový kostým</h2>
                <form name="form" onSubmit="TODO" enctype="multipart/form-data">
                    <div className="row">
                        <div className="form-group col-sm-6">
                            <label htmlFor="name">Jméno</label>
                            <input type="text" className="form-control" name="name" value={item && item.name}
                                    onChange=""/>
                        </div>
                        <div className="form-group col-sm-6">
                            <label htmlFor="manufacturer">Výrobce</label>
                            <input type="text" className="form-control" name="manufacturer" value={item && item.manufacturer}
                                   onChange="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-12">
                            <label htmlFor="description">Popis</label>
                            <input type="text" className="form-control" name="description" value={item && item.description}
                                   onChange="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-3">
                            <label htmlFor="count">Počet kusů</label>
                            <input type="number" className="form-control" name="count" value={item && item.count}
                                   onChange="" />
                        </div>
                        <div className="form-group col-sm-3">
                            <label htmlFor="price">Cena</label>
                            <input type="number" className="form-control" name="price" value={item && item.price}
                                   onChange="" />
                        </div>
                        <div className="form-group col-sm-3">
                            <label htmlFor="size">Velikost</label>
                            <input type="text" className="form-control" name="size" value={item && item.size}
                                   onChange="" />
                        </div>
                        <div className="form-group col-sm-3">
                            <label htmlFor="image">Obrázek</label>
                            <input type="file" className="form-control" name="image" value={item && item.image}
                                   onChange="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-sm-4">
                            <label htmlFor="color">Barva</label>
                            <input type="text" className="form-control" name="color" value={item && item.color}
                                   onChange="" />
                        </div>
                        <div className="form-group col-sm-4">
                            <label htmlFor="material">Materiál</label>
                            <input type="text" className="form-control" name="material" value={item && item.material}
                                   onChange="" />
                        </div>
                        <div className="form-group col-sm-4">
                            <label htmlFor="wear_level">Opotřebení</label>
                            <input type="text" className="form-control" name="wear_level" value={item && item.wear_level}
                                   onChange="" />
                        </div>
                    </div>
                    <div className="row">
                        <input type="submit" value="Odeslat" className="btn btn-success" />
                        <Link to="/adminCostumes" className="btn btn-link">Zrušit</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {loggedIn} = state.authentication;
    return {
        loggedIn,
    };
}

export default connect(mapStateToProps)(AddCostumePage);
