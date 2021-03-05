import { connect } from 'react-redux';
import ForgetPassword from '../components/ForgetPassword';
import { resetPassword, init } from '../store/reducer/resetPassword-reducer';

const mapStateToProps =
 (state) => ({
   mail: state.resetPassword.mail
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (formState) => {
        dispatch(resetPassword(formState))
    },
    init: () => {
        dispatch(init())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);