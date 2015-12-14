import React from 'react';
import { State,History } from 'react-router';
import Immutable from 'immutable';
import marked from 'marked'
import ErrorListView from './ErrorListView';
import BaseComponent from './BaseComponent';

import * as RepaymentActions from '../actions/RepaymentActions';
import * as FundingLineActions from '../actions/FundingLineActions';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {formatDate} from '../utils/utils'
import { Link } from 'react-router';

import ReactMixin from 'react-mixin';



@connect(state => (
{
  repayment: state.repayments,
  loanProduct: state.loanProducts
}
))
@ReactMixin.decorate(History)
class RepaymentDetailView extends BaseComponent {


  constructor(props,context) {
    super(props,context);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }


  handleKeyDown(e){
    let key = e.which | e.keyCode;



    if(key == 13){ //enter

      var id = this.props.repayment.repayment.id;
      var name = this.state.name


      if (!name) {
        return;
      }
      let values = {
        name: name
      };

      const { repayment, dispatch } = this.props;
      const actions = bindActionCreators(RepaymentActions, dispatch);

      actions.updateRepayment(id,values);

    }else if(key == 27){ //esc
    }
  }


  handleClose(e){
    this.props.history.replaceState(null, `/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}`, null);
  }
  handleEdit(e){
    this.props.history.replaceState(null, `/customers/${this.props.params.customer_id}/loanContracts/${this.props.params.loan_contract_id}/repayments/${this.props.params.id}/edit`, null);
  }


   componentWillMount(){
     const { repayment, dispatch } = this.props;
     const repaymentActions = bindActionCreators(RepaymentActions, dispatch);
     repaymentActions.getRepaymentDetail(this.props.params.customer_id,this.props.params.loan_contract_id,this.props.params.id);
  }

  componentWillReceiveProps(nextProps){
    let repayment = nextProps.repayment.repayment;
    let self = this;
    Object.keys(repayment).forEach(function (element, index) {
      if(self.state[element] == null){
        let obj = {};
        obj[element] = repayment[element]
        self.setState(obj);
      }
    });

    if(nextProps.repayment.isRepaymentUpdated == true){
      this.refs.message.show();
    }

  }

  onChangeText(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }

  render() {
    let { repayment,loanProduct, dispatch } = this.props;
    let repaymentDetail = repayment.repayment;
    let errorsNode = this.getErrorNodes(this.props.repayment.repaymentErrors);
    let messageView = this.getMessageView("Repayments updated!","message");




    return (


      <div>
        {messageView}
        {errorsNode}
      </div>

    );



  }

}


export default RepaymentDetailView;
