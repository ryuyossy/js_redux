import React from 'react';
import { State, History } from 'react-router';
import Immutable from 'immutable';

import BaseComponent from './BaseComponent';

import BorrowingSituationFormView from './BorrowingSituationFormView';

import mui from "material-ui";
import injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin();
let ThemeManager = new mui.Styles.ThemeManager();
let DatePicker = mui.DatePicker;
let RadioButton = mui.RadioButton;
let RadioButtonGroup = mui.RadioButtonGroup;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import * as BorrowingSituationActions from '../actions/BorrowingSituationActions';
import * as LoanUsageActions from '../actions/LoanUsageActions';


import {YES, NO} from "../constants/Constants.js"



let Checkbox = mui.Checkbox;

import {formatDate} from '../utils/utils'


import ReactMixin from 'react-mixin';


@connect(state => (
{
  borrowing_situations: state.borrowingSituations,
  loan_usages: state.loanUsages
}
))
@ReactMixin.decorate(History)
class BorrowingSituationEditView extends BaseComponent {

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

    this.onChangeSelectValue = this.onChangeSelectValue.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);

  }

  handleSubmit(values) {
    const {  dispatch } = this.props;
    const borrowingSituationActions = bindActionCreators(BorrowingSituationActions, dispatch);
    if(values["id"]){
      borrowingSituationActions.updateBorrowingSituation(this.props.params.id,values["id"], values);
    }else{
      borrowingSituationActions.createBorrowingSituation(this.props.params.id, values);
    }
  }


  handleNext() {
    if(this.props.location.query.potential == "true"){
      this.props.history.pushState(null, `/potential_customers/${this.props.params.id}/activities`, {defaultFlow: true});
    }else{
      this.props.history.pushState(null, `/customers/${this.props.params.id}/families`, {defaultFlow: true});
    }
  }

  handleKeyDown(e){

  }


  componentWillMount(){
    const { dispatch } = this.props;
    const borrowingSituationActions = bindActionCreators(BorrowingSituationActions, dispatch);
    const loanUsageActions = bindActionCreators(LoanUsageActions, dispatch);
    borrowingSituationActions.getBorrowingSituations(this.props.params.id);
    loanUsageActions.getLoanUsages();
    this.setDefaultStates(this.props,this.state);
 }


 setDefaultStates(nextProps,nextState){

 }

 componentWillReceiveProps(nextProps,nextState){
   this.setDefaultStates(nextProps,nextState);
 }


  onChangeSelectValue(e) {
    this.setState({selectValue: e.target.value});
  }

  onChangeValue(e){
    let obj = {};
    obj[e.target.id] = e.target.value;
    this.setState(obj);
  }


  render() {
    // let errorsNode = this.getErrorNodes(this.props.guarantors.errors);

    let self = this;
    let customerId = this.props.params.id;
    let borrowingSituations = null;
    if(this.props.borrowing_situations != null){
      borrowingSituations = this.props.borrowing_situations.borrowingSituations;
    }
    let loanUsages = this.props.loan_usages.loanUsages;
    let borrowingNodes = null;
    if(borrowingSituations == null || borrowingSituations.length == 0){
      borrowingNodes =
      (
        <BorrowingSituationFormView onSubmit={this.handleSubmit} customer_id={customerId} loan_usages={loanUsages}  borrowingSituation={null} />
      );
    }else{
      borrowingNodes = borrowingSituations.map(function(borrowingSituation, index) {
        return (
          // `key` is a React-specific concept and is not mandatory for the
          // purpose of this tutorial. if you're curious, see more here:
          // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
          <BorrowingSituationFormView onSubmit={self.handleSubmit} customer_id={customerId} loan_usages={loanUsages} index={index+1}  errors={borrowingSituation.errors} key={borrowingSituation.id} borrowing_situation={borrowingSituation} id={borrowingSituation.id}  />
        );
      });
      borrowingNodes.push(
        <BorrowingSituationFormView key="1" onSubmit={self.handleSubmit} customer_id={customerId} loan_usages={loanUsages} borrowingSituation={null} />
      )
    }
    return (
      <div>
        {borrowingNodes}

        <button onClick={this.handleNext} className="btn waves-effect waves-light" type="submit" name="action">Next
            <i className=""></i>
        </button>

      </div>
    );
  }
}

export default BorrowingSituationEditView;
