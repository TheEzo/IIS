import React from 'react';
import {Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {history} from '../_helpers';
import {alertActions} from '../_actions';

import {HomePage} from '../HomePage';
import {LoginPage} from '../LoginPage';
import {RegisterPage} from '../RegisterPage';

import {Navbar} from "../_components";
import {AddCostumePage, CostumesPage, EditCostumePage} from "../CostumesPage";
import {AccessoriesPage, AddAccessoriePage, EditAccessoriePage} from "../AccessoriesPage";
import {CartPage, MyOrdersPage} from "../OrdersPage";
import {EditProfilePage, ProfilePage} from "../ProfilePage";
import {ManageAccessoriesPage, ManageOrdersPage, ManageCostumesPage, ManageProfilesPage} from "../ManagePage";

class App extends React.Component {
    constructor(props) {
        super(props);

        const {dispatch} = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <Router history={history}>
                        <Navbar/>
                        <div className="col-sm-12">
                            {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }

                            <div>
                                <Route exact path="/" component={HomePage} />
                                <Route path="/home" component={HomePage}/>

                                <Route path="/login" component={LoginPage}/>
                                <Route path="/register" component={RegisterPage}/>

                                <Route path="/cart" component={CartPage} />

                                <Route path="/profile" component={ProfilePage} />
                                <Route path="/editProfile" component={EditProfilePage} />
                                <Route path="/orderHistory" component={MyOrdersPage} />

                                <Route path="/adminAccessories" component={ManageAccessoriesPage} />
                                <Route path="/adminCostumes" component={ManageCostumesPage} />
                                <Route path="/adminOrders" component={ManageOrdersPage} />
                                <Route path="/adminUsers" component={ManageProfilesPage} />

                                <Route path="/addCostume" component={AddCostumePage} />
                                <Route path="/editCostume/:id" component={EditCostumePage} />
                                <Route path="/addAccessorie" component={AddAccessoriePage} />
                                <Route path="/editAccessorie/:id" component={EditAccessoriePage} />

                                <Route path="/costumes" component={CostumesPage}/>
                                <Route path="/accessories" component={AccessoriesPage}/>
                            </div>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export {connectedApp as App};