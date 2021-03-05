import { connect } from 'react-redux';
import Password from '../components/Password';
import {  accountPassword, init } from '../store/reducer/account-reducer';



const mapStateToProps = 
 
(state) => ({
   password: state.account.password,
   update: state.account.update,
   error: state.account.error
});

const mapDispatchToProps = (dispatch) => ({
  
  onSubmit: (formState) => {
        dispatch(accountPassword(formState));// transfer input_name value ?
    },
  init: () => {
      dispatch(init());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Password);