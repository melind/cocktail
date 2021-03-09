
import userAPI from '../../services/userAPI';

const stateInitial = { 
    pseudo: '',
    mail: '',
    password: '',
    date: '',
 };

 export const ACCOUNT_SUCCESS = "ACCOUNT_SUCCESS";
 export const ACCOUNT_ERROR = "ACCOUNT_ERROR";
 export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
 export const UPDATE_ERROR = "UPDATE_ERROR";
 export const DELETE_SUCCESS = "DELETE_SUCCESS";
 export const DELETE_ERROR = "DELETE_ERROR";
 export const RESEND_SUCCESS = "RESEND_SUCCESS";
 export const RESEND_ERROR = "RESEND_ERROR";
 export const INIT = "INIT";

const reducer = (state = stateInitial, action : {type: string, payload : any}) => {
    switch(action.type){
        case ACCOUNT_SUCCESS: 
            return {
                ...state, // = stateInitial
                ...action.payload,// = overwrite stateInitial with data from appli
                error: false

            }
        case ACCOUNT_ERROR:
            return {
                ...state,
                error: "affichage non réussi",

            }

        case UPDATE_SUCCESS: 
            return {
                ...state, 
                ...action.payload,
                error: false

            }
        case UPDATE_ERROR:
            return {
                ...state,
                error: "mise à jour non réussi",

            }
        case DELETE_SUCCESS: 
            return {
                ...state, 
                ...stateInitial,
                error: false

            }
        case DELETE_ERROR:
            return {
                ...state,
                error: "désinscription non réussi",

            }
        case RESEND_SUCCESS: 
            return {
                ...state, 
                ...stateInitial,
                error: false

            }
        case RESEND_ERROR:
            return {
                ...state,
                error: "No user",

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
export const displayAccount = () => (dispatch, getState) => {
    

    // collect user info
    return  userAPI.infoUser()
        .then( (res) => {
            // inform my reducer this is a success 
            //and take data from response of accountController.displayAccount
            
            dispatch(accountSuccess(res.data.user));
        })
        .catch(err => {
            // inform my reducer there is an error
 
            dispatch(accountError());
        });
};

export const accountPseudo = (formState) => (dispatch, getState) => {
    // name of the input
  
    // axios collect post info from the user via name input
    return  userAPI.updatePseudo(formState)
        .then( (res) => {
            // inform my reducer this is a success 
            //and take data from response of accountController.updateAccount
            
            dispatch(updateSuccess(res.data));
        })
        .catch(err => {
            // inform my reducer there is an error
            if (err.response.data.error.keyValue.pseudo ) {
                alert((err.response.data.error.keyValue.pseudo)  + " existe déjà!");};
          
            dispatch(updateError());
        });
};

export const accountMail = (formState) => (dispatch, getState) => {
    // name of the inputateInitial
    
    // axios collect post info from the user via name input
    return  userAPI.updateMail(formState)
        .then( (res) => {
            // inform my reducer this is a success 
            //and take data from response of accountController.updateAccount
            
            dispatch(updateSuccess(res.data));
        })
        .catch(err => {
            // inform my reducer there is an error
      
            if (err.response.data.error.keyValue.mail) {
                alert((err.response.data.error.keyValue.mail) + " existe déjà!");};
          
            dispatch(updateError());
        });
};


export const accountPassword = (formState) => (dispatch, getState) => {
    // name of the input
    // axios collect post info from the user via name input
    return  userAPI.updatePassword(formState)
        .then( (res) => {
            // inform my reducer this is a success 
            //and take data from response of accountController.updateAccount
            
            dispatch(updateSuccess(res.data));
        })
        .catch(err => {
            // inform my reducer there is an error
          
            dispatch(updateError());
        });
};

export const deleteAccount = () => (dispatch, getState) => {
   
    return  userAPI.deleteUser()
        .then( (res) => {
            // inform my reducer this is a success 
            
            dispatch(deleteSuccess());
        })
        .catch(err => {
            // inform my reducer there is an error
            dispatch(deleteError());
        });
};

export const resend = (formState) => (dispatch, getState) => {
    // name of the inputateInitial
    
    // axios collect post info from the user via name input
    return  userAPI.resendToken(formState)
        .then( (res) => {
            // inform my reducer this is a success 
            //and take data from response of accountController.updateAccount
            
            dispatch(resendSuccess());
        })
        .catch(err => {
            // inform my reducer there is an error
      
            if (err) {
                 alert("No user")};
          
            dispatch(resendError());
        });
};
/*-----------    action creator  -------------*/
// function that create actions (= payload = data from the application for the store = update stateInitial)



export const accountSuccess = (payload) => ({
    type: ACCOUNT_SUCCESS,
    payload
});

export const accountError = () => ({
    type: ACCOUNT_ERROR
});

export const updateSuccess = (payload) => ({
    type: UPDATE_SUCCESS,
    payload
});

export const updateError = () => ({
    type: UPDATE_ERROR
});


export const deleteSuccess = () => ({
    type: DELETE_SUCCESS
});

export const deleteError = () => ({
    type: DELETE_ERROR
});

export const resendSuccess = () => ({
    type: RESEND_SUCCESS
});

export const resendError = () => ({
    type: RESEND_ERROR
});

export const init = () => ({
    type: INIT
});
export default reducer;