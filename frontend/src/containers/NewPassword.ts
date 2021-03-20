import { connect } from 'react-redux';
import NewPassword from '../components/NewPassword';
import {  newPassword, init } from '../store/reducer/newPassword-reducer';



const mapStateToProps = 
 
(state) => ({
   password: state.newPassword.password,
   error: state.newPassword.error
});

const mapDispatchToProps = (dispatch) => ({
  
  onSubmit: (token,formState) => {
        dispatch(newPassword(token,formState));// transfer input_name value ?
    },
  init: () => {
      dispatch(init());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);