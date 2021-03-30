import { combineReducers } from 'redux';

import account from './account-reducer';
import confirm from './confirm-reducer';
import loggedout from './loggedout-reducer';
import login from './login-reducer';
import signup from './signup-reducer';
import newPassword from './newPassword-reducer';
import reset from './reset-reducer';

const rootReducer = combineReducers({

    account,
    confirm,
    loggedout,
    login,
    newPassword,
    reset,
    signup
  
});

export default rootReducer;