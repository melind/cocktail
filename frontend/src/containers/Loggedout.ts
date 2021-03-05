import { connect } from 'react-redux';
import Loggedout from '../components/Loggedout';
import { logoutSuccess, displayPseudo } from '../store/reducer/loggedout-reducer';



const mapStateToProps = 
 
(state) => ({
   loggedout: state.loggedout.loggedout ,
   pseudo: state.loggedout.pseudo, 
});

const mapDispatchToProps = (dispatch) => ({
   onClick: () => {
        dispatch(logoutSuccess());
    },
    display : () => {
        dispatch(displayPseudo());
    },
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Loggedout);