import { connect } from 'react-redux';
import Confirm from '../components/Confirm/index.jsx';
import {  confirm, init } from '../store/reducer/confirm-reducer';



const mapStateToProps = 
 
(state) => ({
   confirm: state.confirm.confirm,
   error: state.confirm.error
});

const mapDispatchToProps = (dispatch) => ({
  
  confirmAccount: (token) => {
        dispatch(confirm(token));// transfer input_name value ?
    },
  init: () => {
      dispatch(init());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);