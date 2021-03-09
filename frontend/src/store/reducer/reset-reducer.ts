import userAPI from '../../services/userAPI';

const stateInitial = { 
    mail: '',
 };

 export const RESET_DEMAND_SUCCESS = "ACCOUNT_SUCCESS";
 export const RESET_DEMAND_ERROR = "ACCOUNT_ERROR";
 export const INIT = "INIT";

const reducer = (state = stateInitial, action : {type: string, payload : any}) => {
    switch(action.type){
        case RESET_DEMAND_SUCCESS: 
            return {
                ...state, // = stateInitial
                ...action.payload,// = overwrite stateInitial with data from appli
                error: false

            }
        case RESET_DEMAND_ERROR:
            return {
                ...state,
                error: "Mail n'existe pas",

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

export const reset = (formState) => (dispatch, getState) => {
    // name of the input
  
    // axios collect post info from the user via name input
    return  userAPI.resetPassword(formState)
        .then( (res) => {
            // inform my reducer this is a success 
            //and take data from response of accountController.updateAccount
            
            dispatch(resetDemandSuccess(res.data));
        })
        .catch(err => {
            // inform my reducer there is an error
            console.log(err)
          
            dispatch(resetDemandError());
        });
};



/*-----------    action creator  -------------*/
// function that create actions (= payload = data from the application for the store = update stateInitial)



export const resetDemandSuccess = (payload) => ({
    type: RESET_DEMAND_SUCCESS,
    payload
});

export const resetDemandError = () => ({
    type: RESET_DEMAND_ERROR
});


export const init = () => ({
    type: INIT
});
export default reducer;