import { connect } from 'react-redux';
import Loggedout from '../components/Loggedout';
import { logoutUser, displayPseudo } from '../store/reducer/loggedout-reducer';



const mapStateToProps = 
 
(state) => ({
   loggedout: state.loggedout.loggedout ,
   pseudo: state.loggedout.pseudo, 
   error: state.loggedout.error
});

const mapDispatchToProps = (dispatch) => ({
   onClick: () => {
        dispatch(logoutUser());
    },
    display : () => {
        dispatch(displayPseudo());
    },
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Loggedout);