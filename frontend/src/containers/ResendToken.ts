import { connect } from 'react-redux';
import ResendToken from '../components/ResendToken';
import {  resend, init } from '../store/reducer/account-reducer';



const mapStateToProps = 
 
(state) => ({
   mail: state.account.mail,
   error: state.account.error
});

const mapDispatchToProps = (dispatch) => ({
  
  onSubmit: (formState) => {
        dispatch(resend(formState));// transfer input_name value ?
    },
  init: () => {
      dispatch(init());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResendToken);