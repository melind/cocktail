import { connect } from 'react-redux';
import Mail from '../components/Mail';
import {  accountMail, init } from '../store/reducer/account-reducer';



const mapStateToProps = 
 
(state) => ({
   mail: state.account.mail,
   update: state.account.update,
   error: state.account.error
});

const mapDispatchToProps = (dispatch) => ({
  
  onSubmit: (formState) => {
        dispatch(accountMail(formState));// transfer input_name value ?
    },
  init: () => {
      dispatch(init());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Mail);