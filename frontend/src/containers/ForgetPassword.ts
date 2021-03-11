import { connect } from 'react-redux';
import ForgetPassword from '../components/ForgetPassword';
import { reset, init } from '../store/reducer/reset-reducer';

const mapStateToProps =
 (state) => ({
   mail: state.reset.mail
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (formState) => {
        dispatch(reset(formState))
    },
    init: () => {
        dispatch(init())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);