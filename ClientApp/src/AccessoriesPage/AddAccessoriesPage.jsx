import React from 'react';
import {connect} from 'react-redux';

import {accessoriesActions, userActions} from "../_actions";
import {Link} from "react-router-dom";

class AddAccessoriePage extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch, loggedIn} = this.props;
        if (!loggedIn)
            dispatch(userActions.logout());

        this.state = {
            item: {
                name: '',
                manufacturer: '',
                description: '',
                count: '',
                price: '',
                size: 'M',
                image: '',
                color: '',
                material: '',
                wear_level: 'nove',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { item } = this.state;
        this.setState({
            item: {
                ...item,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Odesilam");
        this.setState({submitted: true});
        const {item} = this.state;
        const {dispatch} = this.props;
        dispatch(accessoriesActions.create(item));
    }

    render() {
        const item = null;
        return (
            <div className="col-md-12 col-md-offset-3">
                <h2>Přidat nový doplněk</h2>
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
                                <option value="S">S</option>
                                <option selected value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="XXXL">XXXL</option>
                            </select>
                        </div>
                        <div className="form-group col-sm-3">
                            <label htmlFor="image">Obrázek</label>
                            <input type="file" className="form-control" name="image" value={item && item.image}
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
                            <select name="wear_level" className="form-control"
                                    onChange={this.handleChange}>
                                <option value="nove" selected>Nové</option>
                                <option value="zanovni">Zánovní</option>
                                <option value="stare">Staré</option>
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
    return {
        loggedIn,
    };
}

export default connect(mapStateToProps)(AddAccessoriePage);
