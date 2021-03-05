import { connect } from 'react-redux';
import NewPassword from '../components/NewPassword';
import {  newPassword, init } from '../store/reducer/newPassword-reducer';



const mapStateToProps = 
 
(state) => ({
   password: state.newPassword.password
});

const mapDispatchToProps = (dispatch) => ({
  
  onSubmit: (formState) => {
        dispatch(newPassword(formState));// transfer input_name value ?
    },
  init: () => {
      dispatch(init());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);