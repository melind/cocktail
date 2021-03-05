import userAPI from '../../services/userAPI';

const stateInitial = { 
    loggedout: false,
    pseudo: ''
 };

 export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
 export const LOGOUT_ERROR = "LOGOUT_ERROR";
 export const INIT = "INIT";
  export const PSEUDO_SUCCESS = "PSEUDO_SUCCESS";
 export const PSEUDO_ERROR = "PSEUDO_ERROR";

const reducer = (state = stateInitial, action: {type: string, payload : any}) => {
    switch(action.type){
        case LOGOUT_SUCCESS: 
            return {
                ...state, 
                loggedout: true,
                error: false

            }
        case LOGOUT_ERROR:
            return {
                ...state,
                loggedout: false,
                error: "Déconnexion non réussi",

            }
        case PSEUDO_SUCCESS: 
            return {
                ...state, // = stateInitial
                ...action.payload,// = overwrite stateInitial with data from appli
                error: false

            }
        case PSEUDO_ERROR:
            return {
                ...state,
                error: "affichage non réussi",

            }
        
        default:
            return state;
    }
}

 


/*-----------    action creator  -------------*/
// function that create actions (= payload = data from the application for the store = update stateInitial)

export const displayPseudo = () => (dispatch, getState) => {
    

    // collect user info
    return  userAPI.pseudoUser()
        .then( (res) => {
            // inform my reducer this is a success 
            //and take data from response of PSEUDOController.displayPSEUDO
            
            dispatch(pseudoSuccess(res.data));
        })
        .catch(err => {
            // inform my reducer there is an error
 
            dispatch(pseudoError());
        });
};



export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});

export const logoutError = () => ({
    type: LOGOUT_ERROR,
});

export const pseudoSuccess = (payload) => ({
    type: PSEUDO_SUCCESS,
    payload
});

export const pseudoError = () => ({
    type: PSEUDO_ERROR
});

export default reducer;