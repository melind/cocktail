import userAPI from '../../services/userAPI';

const stateInitial = { 
    password: '',
    error:''
 };

 export const RESET_PASSWORD_SUCCESS = "ACCOUNT_SUCCESS";
 export const RESET_PASSWORD_ERROR = "ACCOUNT_ERROR";
 export const INIT = "INIT";

const reducer = (state = stateInitial, action : {type: string, payload : any}) => {
    switch(action.type){
        case RESET_PASSWORD_SUCCESS: 
            return {
                ...state, // = stateInitial
                ...action.payload,// = overwrite stateInitial with data from appli
                error: false

            }
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                error: true,

            }

        
        case INIT: 
            return {
                ...state, 
                ...stateInitial

            }
        default:
            return state;
    }
}

        /*-----------    redux thunk  -------------*/
        // action creator which return function

export const newPassword = (token, formState) => (dispatch, getState) => {
    // name of the input
  
    // axios collect post info from the user via name input
    return  userAPI.newPassword(token,formState)
        .then( (res) => {
            // inform my reducer this is a success 
            //and take data from response of accountController.updateAccount
            
            dispatch(resetPasswordSuccess(res.data));
        })
        .catch(err => {
            // inform my reducer there is an error
            console.log(err);
            if (err.response.data) {
                alert(err.response.data.msg);
                }
            dispatch(resetPasswordError());
        });
};



/*-----------    action creator  -------------*/
// function that create actions (= payload = data from the application for the store = update stateInitial)



export const resetPasswordSuccess = (payload) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload
});

export const resetPasswordError = () => ({
    type: RESET_PASSWORD_ERROR
});


export const init = () => ({
    type: INIT
});

export default reducer;