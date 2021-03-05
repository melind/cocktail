import { combineReducers } from 'redux';

import account from './account-reducer';
import loggedout from './loggedout-reducer';
import login from './login-reducer';
import signup from './signup-reducer';
import newPassword from './newPassword-reducer';
import resetPassword from './resetPassword-reducer';

const rootReducer = combineReducers({

    account,
    loggedout,
    login,
    newPassword,
    resetPassword,
    signup
  
});

export default rootReducer;