  
import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { signUp, init } from '../store/reducer/signup-reducer';



const mapStateToProps =
 
(state) => ({
   pseudo: state.signup.pseudo, 
   mail: state.signup.mail,
   password: state.signup.password,
   subscriber: state.signup.subscriber,
   error: state.signup.error
});

const mapDispatchToProps = (dispatch) => ({
   onSubmit: (formState) => {
        dispatch(signUp(formState));// transfer input_name value ?
    },
    init: () => {
        dispatch(init())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);