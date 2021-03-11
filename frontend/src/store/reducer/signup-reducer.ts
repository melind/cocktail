
import userAPI from '../../services/userAPI';

const stateInitial = { 
    pseudo: '',
    mail: '',
    password: '',
 };

 export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
 export const SIGNUP_ERROR = "SIGNUP_ERROR";
 export const INIT = "INIT";

const reducer = (state = stateInitial, action : {type: string, payload : any}) => {
    switch(action.type){
        case SIGNUP_SUCCESS: 
            return {
                ...state, // = stateInitial
                ...action.payload,// = overwrite stateInitial with data frop appli
                error: false

            }
        case SIGNUP_ERROR:
            return {
                ...state,
                error: "Inscription non réussi",

            }
        case INIT:
            return {
                ...state,
                ...stateInitial,
                error: false

            }

        default:
            return state;
    }
}

        /*-----------    redux thunk  -------------*/
        // action creator which return function
export const signUp = (formState) => (dispatch, getState) => {
    // name of the input
    // axios collect post info from the user via name input
    return  userAPI.signupUser(formState)
        .then( (res) => {
            // inform my reducer this is a success 
            //and take data from response of auhtController.postSignup
            
            dispatch(signupSuccess(res.data));
        })
        .catch(err => {
            // inform my reducer there is an error
            if (err.response.data.text) {
                alert(err.response.data.text);
                }
            else if (err.response.data.error.keyValue.pseudo || err.response.data.error.keyValue.mail) {
                alert((err.response.data.error.keyValue.pseudo ||  err.response.data.error.keyValue.mail) + " existe déjà!");
                }
                else {

                }
 
            dispatch(signupError());
        });
};

/*-----------    action creator  -------------*/
// function that create actions (= payload = data from the application for the store = update stateInitial)



export const signupSuccess = (payload) => ({
    type: SIGNUP_SUCCESS,
    payload
});

export const signupError = () => ({
    type: SIGNUP_ERROR,
});

export const init = () => ({
    type: INIT
});
export default reducer;