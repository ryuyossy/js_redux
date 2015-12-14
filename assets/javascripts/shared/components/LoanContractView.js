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


class LoanContractView extends BaseComponent {



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
    this.state = { loanContractManagerUserId: null };
    this.handleDelete = this.handleDelete.bind(this);
  }



  handleDelete(e) {
    this.props.actions.deleteLoanContract(this.props.loanContract.id,this.props.customer_id);
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

    let loanContract =  this.props.loanContract;
    let linkParams = {customer_id: this.props.customer_id, loan_contract_id: this.props.loanContract.id};

    let disbursementDate = "N/A";
    if(loanContract.disbursement_date){
      disbursementDate = new Date(loanContract.disbursement_date);
      disbursementDate = formatDate(disbursementDate);
    }

    result = (
      <div className="row">
        <div className="column" data-label="contract_no">
          <Link to={`/customers/${linkParams.customer_id}/loanContracts/${linkParams.loan_contract_id}`} >
            {loanContract.loan_contract_no}
          </Link>
        </div>
        <div className="column" data-label="status">
          Status
        </div>
        <div className="column" data-label="disbursement_date">
          {disbursementDate}
        </div>
        <div className="column" data-label="loan_amount">
          {loanContract.amount}
        </div>
      </div>
    );

    return result
  }


}


export default LoanContractView;
