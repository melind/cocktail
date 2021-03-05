import { connect } from 'react-redux';
import UserName from '../components/UserName';
import {  accountPseudo, init } from '../store/reducer/account-reducer';



const mapStateToProps = 
 
(state) => ({
   pseudo: state.account.pseudo,
   update: state.account.update,
   error: state.account.error
});

const mapDispatchToProps = (dispatch) => ({
  
  onSubmit: (formState) => {
        dispatch(accountPseudo(formState));// transfer input_name value ?
    },
  init: () => {
      dispatch(init());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserName);