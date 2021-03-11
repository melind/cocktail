
import userAPI from '../../services/userAPI';

const stateInitial = { 
    pseudo: '',
    password: '',
    loggedin: false,
    error: ''
 };

 export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
 export const LOGIN_ERROR = "LOGIN_ERROR";
 export const INIT = "INIT";
 
const reducer = (state = stateInitial, action : {type: string, payload: any}) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,// = stateInitial
                ...action.payload,// = overwrite stateInitial with data from appli
                loggedin: true,
                error: false,

            }
        case LOGIN_ERROR:
            return {
                ...state,
                loggedin: false,
                error: "Connexion failed",

            }
        case INIT:
            return {
                ...state,
                ...stateInitial,
                loggedin: false,
                error: false

            }

        default:
            return state;
    }
};
        /*-----------    redux thunk  -------------*/
        // action creator which return function
export const login = (formState) => (dispatch, getState) => {

    // axios check post info from the user
    return userAPI.loginUser(formState)
        .then(res => {
            // inform my reducer this is a success
            //and take data from response of auhtController.postLogin
            dispatch(loginSuccess(res.data));
        })
        .catch(err => {
            // inform my reducer there is an error
            if (err.response.data.text) {alert(err.response.data.text);}
            dispatch(loginError());
        })
};
/*-----------    action creator  -------------*/
// function that create actions (= payload = data from the application for the store)
export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
});

export const loginError = () => ({
    type: LOGIN_ERROR,
});

export const init = () => ({
    type: INIT
});


export default reducer; 