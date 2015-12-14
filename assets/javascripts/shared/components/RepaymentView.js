import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import BaseComponent from './BaseComponent';
import { Link } from 'react-router';
import {formatDate} from '../utils/utils'


import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"
injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();

class RepaymentView extends BaseComponent {



  static get childContextTypes(){
    return {muiTheme: React.PropTypes.object.isRequired};
  }

  getChildContext(){
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }


  constructor(props,context) {
    super(props,context);
    this.state = { repaymentManagerUserId: null };
    this.handleDelete = this.handleDelete.bind(this);
  }



  handleDelete(e) {
    this.props.actions.deleteRepayment(this.props.customer_id,this.props.loan_contract_id,this.props.repayment.id);
  }





  componentWillReceiveProps(nextProps){

  }

  render() {
    let result;
    let errorsNode = this.getErrorNodes(this.props.errors);
    let border = "row 5 grey lighten-4"
    if(this.props.index % 2 == 0){
      border = "row"
    }

    let repayment =  this.props.repayment;
    let linkParams = {customer_id: this.props.customer_id, loan_contract_id: this.props.loan_contract_id, id:this.props.repayment.id};

    result = (<div className={border}>
      <div className="col s2" >
        {repayment.paymnet_day}
      </div>
      <div className="col s2" >
        {repayment.amount}
      </div>
      <div className="col s2">
        <Link to={`/customers/${linkParams.customer_id}/loanContracts/${linkParams.loan_contract_id}/repayments/${linkParams.id}`} >
          Show detail
        </Link>
      </div>
    </div>);

    return result
  }


}


export default RepaymentView;
