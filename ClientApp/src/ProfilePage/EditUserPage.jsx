import React, {Fragment} from "react";
import {userActions} from "../_actions";
import {history} from "../_helpers";
import {Loader} from "../_components";
import {connect} from 'react-redux';

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
        console.log("Odesilam");
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