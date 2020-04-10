import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {users} from './users.reducer';
import {alert} from './alert.reducer';
import {costumes} from "./costumes.reducer";
import {accessories} from "./accessories.reducer";

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    costumes,
    accessories,
});

export default rootReducer;