import { connect } from 'react-redux';
import Login from '../components/Login';
import { login, init } from '../store/reducer/login-reducer';




const mapStateToProps =
 (state) => ({
   pseudo: state.login.pseudo,
    password: state.login.password,
    loggedin: state.login.loggedin,
    subscriber: state.login.subscriber,
    error: state.login.error
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (formState) => {
        dispatch(login(formState))
        
    },
    init: () => {
        dispatch(init())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);