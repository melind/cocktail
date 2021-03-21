import userAPI from '../../services/userAPI';

const stateInitial = { 
   confirm: false,
   error: false,
 };

 export const CONFIRM_SUCCESS = "CONFIRM_SUCCESS";
 export const CONFIRM_ERROR = "CONFIRM_ERROR";
 export const INIT = "INIT";

const reducer = (state = stateInitial, action : {type: string, payload : any}) => {
    switch(action.type){
        case CONFIRM_SUCCESS: 
            return {
                ...state, // = stateInitial
                confirm: true,// = overwrite stateInitial with data from appli
                error: false

            }
        case CONFIRM_ERROR:
            return {
                ...state,
                confirm: false,
                error: "An error occur."

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

export const confirm = (token) => (dispatch, getState) => {
    // name of the input
  
    // axios collect post info from the user via name input
    return  userAPI.confirm(token)
        .then( (res) => {
            // inform my reducer this is a success 
            //and take data from response of CONFIRMController.updateCONFIRM
                
                 dispatch(confirmSuccess(res.data || ""));
        })
        .catch(err => {
            // inform my reducer there is an error
            if(err && err.reponse.data.type ){
                alert( err.reponse.data.type)
            }
            
            dispatch(confirmError());
        });
};



/*-----------    action creator  -------------*/
// function that create actions (= payload = data from the application for the store = update stateInitial)



export const confirmSuccess = (payload) => ({
    type: CONFIRM_SUCCESS,
    payload
});

export const confirmError = () => ({
    type: CONFIRM_ERROR
});


export const init = () => ({
    type: INIT
});
export default reducer;