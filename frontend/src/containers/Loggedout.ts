import { connect } from 'react-redux';
import Loggedout from '../components/Loggedout';
import { logoutUser, displayPseudo, init } from '../store/reducer/loggedout-reducer';



const mapStateToProps = 
 
(state) => ({
   loggedout: state.loggedout.loggedout ,
   pseudo: state.loggedout.pseudo, 
});

const mapDispatchToProps = (dispatch) => ({
   onClick: () => {
        dispatch(logoutUser());
    },
    display : () => {
        dispatch(displayPseudo());
    },
    init: () => {
        dispatch(init())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Loggedout);